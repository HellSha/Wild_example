var statementConstructor = function () {

	this.createPreparedInsertStatement = function (sTableName, oValueObject) {
		let oResult = {
			aParams: [],
			aValues: [],
			sql: "",
		};
		let sColumnList = '',
			sValueList = '';

		Object.keys(oValueObject).forEach(value => {
			sColumnList += `"${value}",`;
			oResult.aParams.push(value);
		});

		Object.values(oValueObject).forEach(value => {
			sValueList += "?, ";
			oResult.aValues.push(value);
		});

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
		let sColumnList = '',
			sValueList = '';

		Object.keys(oValueObject).forEach(value => {
			sColumnList += `"${value}",`;
			oResult.aParams.push(value);
		});

		Object.values(oValueObject).forEach(value => {
			sValueList += "?, ";
			oResult.aValues.push(value);
		});

		sColumnList = sColumnList.slice(0, -1);
		sValueList = sValueList.slice(0, -2);

		oResult.sql = `UPDATE "${sTableName}" SET "name"='${oValueObject.name}' WHERE "usid"=${oValueObject.usid};`;

		$.trace.error("sql to update: " + oResult.sql);
		return oResult;
	};

	this.createPreparedDeleteStatement = function (sTableName, oConditionObject) {
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

		sWhereClause = sWhereClause.slice(0, -5);
		if (sWhereClause.length > 0) {
			sWhereClause = " where " + sWhereClause;
		}

		oResult.sql = `DELETE FROM "${sTableName}" ${sWhereClause}`;

		$.trace.error("sql to delete: " + oResult.sql);
		return oResult;
	};

};