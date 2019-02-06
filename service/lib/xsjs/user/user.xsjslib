var statementConstructor = function () {
    
    this.createPreparedInsertStatement = function (sTableName, oValueObject) {
        let oResult = {
            aParams: [],
            aValues: [],
            sql: "",
        };
        let sColumnList = '', sValueList = '';

        Object.keys(oValueObject).forEach(value => {
            sColumnList += `"${value}",`;
            oResult.aParams.push(value);
        });

        Object.values(oValueObject).forEach(value => {
            sValueList += "?, ";
            oResult.aValues.push(value);
        });

        // Remove the last unnecessary comma and blank
        sColumnList = sColumnList.slice(0, -1);
        sValueList = sValueList.slice(0, -2);

        oResult.sql = `insert into "${sTableName}" (${sColumnList}) values (${sValueList})`;

        $.trace.error("sql to insert: " + oResult.sql);
        return oResult;
    };

    this.createPreparedUpdateStatement = function (sTableName, oValueObject) {
        let oResult = {
            aParams: [],
            aValues: [],
            sql: "",
        };
        let sColumnList = '', sValueList = '';

        Object.keys(oValueObject).forEach(value => {
            sColumnList += `"${value}",`;
            oResult.aParams.push(value);
        });

        Object.values(oValueObject).forEach(value => {
            sValueList += "?, ";
            oResult.aValues.push(value);
        });

        // Remove the last unnecessary comma and blank
        sColumnList = sColumnList.slice(0, -1);
        sValueList = sValueList.slice(0, -2);

        oResult.sql = `UPDATE "${sTableName}" SET "name"='${oValueObject.name}' WHERE "usid"=${oValueObject.usid};`;

        $.trace.error("sql to update: " + oResult.sql);        
        return oResult;
    };
    
    this.createPreparedDeleteStatement = function (sTableName, oConditionObject) 
    {
        let oResult = {
            aParams: [],
            aValues: [],
            sql: "",
        };

        let sWhereClause = '';
        for (let key in oConditionObject) {
            sWhereClause += `"${key}"=? and `;
            oResult.aValues.push(oConditionObject[key]);
            oResult.aParams.push(key);
        }
        // Remove the last unnecessary AND
        sWhereClause = sWhereClause.slice(0, -5);
        if (sWhereClause.length > 0) {
            sWhereClause = " where " + sWhereClause;
        }

        oResult.sql = `DELETE FROM "${sTableName}" ${sWhereClause}`;

        $.trace.error("sql to delete: " + oResult.sql);
        return oResult;
    };

};


var user = function (connection) {

    const statementConstructorLib = new statementConstructor();

    const USER_TABLE = "HiMTA::User";
   
    /*
            const USER = $.session.securityContext.userInfo.familyName ?
                $.session.securityContext.userInfo.familyName + " " + $.session.securityContext.userInfo.givenName :
                $.session.getUsername().toLocaleLowerCase(),
    */

    function getNextval(sSeqName) {

        const statement = `select "${sSeqName}".NEXTVAL as "ID" from dummy`;
        
        const result = connection.executeQuery(statement);

        if (result.length > 0) {
            return result[0].ID;
        } else {
            throw new Error('ID was not generated');
        }
    }

    this.doGet = function () { 

        const result = connection.executeQuery('SELECT * FROM "HiMTA::User"');

        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    };


    this.doPost = function (oUser) {

        //Get Next ID Number
        oUser.usid = getNextval("HiMTA::usid");

        //generate query
        const statement = statementConstructorLib.createPreparedInsertStatement(USER_TABLE, oUser);
        //execute update
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oUser));
    };


    this.doPut = function (oUser) {
        //generate query
        let sql="";

        sql = `UPDATE "${USER_TABLE}" SET "name"='${oUser.name}' WHERE "usid"=${oUser.usid};`;
        $.trace.error("sql to update: " + sql);

        //execute update
        connection.executeUpdate(sql);
        connection.commit();

        $.response.status = $.net.http.OK;
        $.response.setBody('User updated');
    };


    this.doDelete = function (usid) {
/*
        statement = `DELETE FROM "${USER_TABLE}" WHERE "usid"=${oUser.usid}`;
        connection.executeUpdate(statement);

        connection.commit();

        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify({}));
*/
        const statement = statementConstructorLib.createPreparedDeleteStatement(USER_TABLE, {usid: usid});
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify({}));
    };
};