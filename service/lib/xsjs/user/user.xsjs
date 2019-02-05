const UserLib = $.import('xsjs.user', 'user').user;
const userLib = new UserLib($.hdb.getConnection({
	treatDateAsUTC: true
}));
(function () {
	(function handleRequest() {
		try {
			switch ($.request.method) {
			case $.net.http.PUT:
				{
					userLib.put();
					break;
				}
			case $.net.http.POST:
				{
					userLib.post();
					break;
				}
			case $.net.http.DEL:
				{
					userLib.delete();
					break;
				}
			default:
				{
					userLib.get();
					break;
				}
			}
		} catch (e) {
			$.response.status = $.net.http.BAD_REQUEST;
			$.response.setBody(e.message);
		}
	}());
}());