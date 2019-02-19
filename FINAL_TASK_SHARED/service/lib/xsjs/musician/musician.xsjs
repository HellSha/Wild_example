function saveMusician(musician) {

	var conn = $.hdb.getConnection({
    treatDateAsUTC: true
});

	var output = JSON.stringify(musician);

	var createMus = conn.loadProcedure("HiMTA::createMusician");

	var result = createMus({
		IM_ID: musician.mid,
		IM_NAME: musician.name,
		IM_AGE: musician.age,
		IM_DESCR: musician.descr
	});

	conn.commit();

	conn.close();

	if (result && result.EX_ERROR != null) {
		return result.EX_ERROR;
	} else {
		return output;
	}
}

var musician = {
	mid: $.request.parameters.get("mid"),
	name: $.request.parameters.get("name"),
	age: $.request.parameters.get("age"),
	descr: $.request.parameters.get("descr")
};


var output = saveMusician(musician);


$.response.contentType = "application/json";

$.response.setBody(output);