const Muslib = $.import('xsjs.musician', 'musicianREST').user;
const musLib = new Muslib($.hdb.getConnection({
    treatDateAsUTC: true
}));

(function () {
    (function handleRequest() {
        try {
            switch ($.request.method) {
                case $.net.http.GET: {
                    musLib.doGet();
                    break;
                }
                case $.net.http.PUT : {
                    musLib.doPut(JSON.parse($.request.body.asString()));
                    break;
                }
                case $.net.http.POST : {
                    musLib.doPost(JSON.parse($.request.body.asString()));
                    break;
                }
                case $.net.http.DEL : {
                    musLib.doDelete($.request.parameters.get("id"));
                    break;
                }
                default: {
                    musLib.doGet();
                    break;
                }
            }
        } catch (e) {
                $.response.status = $.net.http.BAD_REQUEST;
                $.response.setBody(e.message);
        }
    }());
}());