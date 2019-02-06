var conn = $.hdb.getConnection({treatDateAsUTC: true});
function addUsers () {
	var dataArray = '[{"name": "odataUser1"}, {"name": "odataUser2"}]';
	var userArray = [];

	$(jQuery.parseJSON(JSON.stringify(dataArray))).each(function () {
		var usid = getNextval("HiMTA::usid");
		var name = this.name;
		var user = new User(usid, name);
		userArray.push(user);
	});

	for (var i = 0; i < userArray.lenght; i++) {
		conn.executeUpdate('INSERT INTO "HiMTA::User" VALUES (?,?)', userArray[i].usid, userArray[i].name);
	}

	conn.commit();
	$.response.status = $.net.http.CREATED;
	$.response.setBody("OData Users were created succefully.");
}

function User(usid, name) {
	this.usid = usid;
	this.name = name;
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