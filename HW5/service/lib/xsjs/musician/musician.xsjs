function saveMusician(musician) {

	var conn = $.hdb.getConnection();

	var output = JSON.stringify(musician);

	var fnCreateCountry = conn.loadProcedure("HiMTA::createMusician");

	var result = fnCreateCountry({
		im_mid: musician.mid,
		im_name: musician.name,
		im_age: musician.age,
		im_descr: musician.descr
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

if (musitian.mid != null && musician.name != null && musician.age != null) {
	//TODO validate the inputs here
	var output = saveMusician(musician);
}

$.response.contentType = "application / json";

$.response.setBody(output);