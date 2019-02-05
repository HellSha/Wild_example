var user = function (conn) {

	this.get = function () {
		var query = 'SELECT * FROM "HiMTA::User"';
		var rs = conn.executeQuery(query);

		var body = "";
		for (var item of rs) {
			body += item.usid + ":" +
				item.name + " ";
		}

		$.response.setBody(JSON.stringify(body));
		$.response.contentType = "application/json";
		$.response.status = $.net.http.OK;
	}

	this.post = function () {
		var obj = JSON.parse($.request.body.asString());
		var usid = getNextval("HiMTA::usid");
		var name = obj.name;
		conn.executeUpdate('INSERT INTO "HiMTA::User" VALUES (?,?)', usid, name);

		conn.commit();
		$.response.status = $.net.http.CREATED;
		$.response.setBody("User " + obj.name + " created succefully.");

	};

	this.put = function () {
		var obj = JSON.parse($.request.body.asString());
		var usid = obj.usid;
		var name = obj.name;
		conn.executeUpdate('UPDATE "HiMTA::User" SET "name"=? WHERE "usid"=?', name, usid);

		conn.commit();
		$.response.status = $.net.http.OK;
		$.response.setBody("User " + obj.name + " updated succefully.");
	};

	this.delete = function () {
		var obj = JSON.parse($.request.body.asString());
		var usid = obj.usid;
		conn.executeUpdate('DELETE FROM "HiMTA::User" WHERE "usid"=?', usid);

		conn.commit();
		$.response.status = $.net.http.CREATED;
		$.response.setBody("User " + obj.usid + " deleted succefully.");
	};

	function getNextval(sSeqName) {
		const statement = `select "${sSeqName}".NEXTVAL as "ID" from dummy`;
		const result = conn.executeQuery(statement);

		if (result.length > 0) {
			return result[0].ID;
		} else {
			throw new Error('ID was not generated');
		}
	}
};