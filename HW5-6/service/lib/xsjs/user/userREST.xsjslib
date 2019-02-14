const StatConstructor = $.import('xsjs.user', 'statementConstructor').statementConstructor;
const STATIC_CONN_LIB = new StatConstructor();

var user = function (connection) {

	//const STATIC_CONN_LIB = new statementConstructor();
	const USER_TABLE = "HiMTA::User";

	
    const USER = $.session.securityContext.userInfo.familyName + " " + $.session.securityContext.userInfo.familyName + " " + $.session.securityContext.userInfo.givenName;
    if(!USER){
        $.session.getUsername().toLocaleLowerCase();
    }
	

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
		const result = connection.executeQuery(`SELECT * FROM "${USER_TABLE}"`);

		$.response.status = $.net.http.OK;
		$.response.setBody(JSON.stringify(result));
		
	};

	this.doPost = function (oUser) {
        if(!$.session.hasAppPrivilege("himta.create")){
            oUser.usid = getNextval("HiMTA::usid");

            const statement = STATIC_CONN_LIB.createPreparedInsertStatement(USER_TABLE, oUser);
            connection.executeUpdate(statement.sql, statement.aValues);

            connection.commit();
            $.response.status = $.net.http.CREATED;
            $.response.setBody(JSON.stringify(oUser));
        }
    };

	this.doPut = function (oUser) {
		let sql = "";

		sql = `UPDATE "${USER_TABLE}" SET "name"='${oUser.name}' WHERE "usid"=${oUser.usid};`;
		$.trace.error("sql to update: " + sql);

		connection.executeUpdate(sql);

		connection.commit();
		$.response.status = $.net.http.OK;
		$.response.setBody('User updated');
	};

	this.doDelete = function (usid) {
		const statement = STATIC_CONN_LIB.createPreparedDeleteStatement(USER_TABLE, {
			usid: usid
		});
		connection.executeUpdate(statement.sql, statement.aValues);

		connection.commit();
		$.response.status = $.net.http.OK;
		$.response.setBody(JSON.stringify({}));
	};
};
