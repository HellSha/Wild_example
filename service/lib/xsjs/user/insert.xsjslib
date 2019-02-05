var insertUser = function (conn) {
	this.post = function () {
		var obj = JSON.parse($.request.body.asString());
		var usid = getNextval("HiMTA::usid");
		var name = obj.name;
		conn.executeUpdate('INSERT INTO "HiMTA::User" VALUES (?,?)', usid, name);

		conn.commit();
		$.response.status = $.net.http.CREATED;
		$.response.setBody("User " + obj.name + " created succefully.");
	}

	function getNextval(sSeqName) {
		const statement = `select "${sSeqName}".NEXTVAL as "ID" from dummy`;
		const result = conn.executeQuery(statement);

		if (result.length > 0) {
			return result[0].ID;
		} else {
			throw new Error('ID was not generated');
		}
	}
}