const Userlib = $.import('xsjs.user', 'user').user;
const userLib = new Userlib($.hdb.getConnection({
	treatDateAsUTC: true
}));

const UserInsert = $.import('xsjs.user', 'insert').insertUser;
const userInsert = new UserInsert($.hdb.getConnection({
	treatDateAsUTC: true
}));

(function () {
	(function handleRequest() {
		try {
			switch ($.request.method) {
			case $.net.http.PUT:
				{
					var conn = $.hdb.getConnection();
					var obj = JSON.parse($.request.body.asString());
					var usid = obj.usid;
					var name = obj.name;
					conn.executeUpdate('UPDATE "HiMTA::User" SET "name"=? WHERE "usid"=?', name, usid);

					conn.commit();
					$.response.status = $.net.http.OK;
					$.response.setBody("User " + obj.name + " updated succefully.");
					break;
				}
			case $.net.http.POST:
				{
					userInsert.post();    
					break;
				}
			case $.net.http.DEL:
				{                    
                    var conn = $.hdb.getConnection();
					var obj = JSON.parse($.request.body.asString());
					var usid = obj.usid;
					conn.executeUpdate('DELETE FROM "HiMTA::User" WHERE "usid"=?', usid);

					conn.commit();
					$.response.status = $.net.http.CREATED;
					$.response.setBody("User " + obj.usid + " deleted succefully.");

					break;
				}
			default:
				{
					var conn = $.hdb.getConnection();
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
					break;
				}
			}
		} catch (e) {
			$.response.status = $.net.http.BAD_REQUEST;
			$.response.setBody(e.message);
		}
	}());
}());