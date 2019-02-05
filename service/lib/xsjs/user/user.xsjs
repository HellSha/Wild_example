const Userlib = $.import('xsjs.user', 'user').user;
const userLib = new Userlib($.hdb.getConnection({
    treatDateAsUTC: true
}));

(function () {
    (function handleRequest() {
        try {
            switch ($.request.method) {
                case $.net.http.PUT : {
                    userLib.doPut(JSON.parse($.request.body.asString()));
                    break;
                }
                case $.net.http.POST : {
                    $.response.contentType = "application/text";
                    var body='';
                    var obj = JSON.parse($.request.body.asString());
                    var usid= getNextval("HiMTA::usid");
                    var name=obj.name;
                    function getTxtData()
                    {
                        var connection = $.hdb.getConnection();
                        var statement = null;
                        var resultSet = null;
                        tx_data_query ='INSERT INTO "HiMTA::User" (usid,name) VALUES (' + usid + ',\'' + name + '\')';
                       try
                        {
                        
                        statement = connection.prepareStatement(tx_data_query);
                        resultSet= statement.executeQuery();
                        connection.commit();
                        } finally {
                        statement.close();
                        connection.close();
                        }
                        return resultSet;
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
                    this.doGet = function ()
                    {
                              try
                              {
                              $.response.contentType = "application/json";  $.response.contentType = "text/plain";  $.response.setBody(getTxtData());
                              }  catch(err) {
                                 $.response.contentType = "text/plain";  $.response.setBody("Error while executing query: [" +err.message +"]");  $.response.returnCode = 200;
                              }
                    };
                    doGet();
                    break;
                }
                case $.net.http.DEL : {
                    userLib.doDelete($.request.parameters.get("userid"));
                    break;
                }
                default: {
                    userLib.doGet();
                    break;
                }
            }
        } catch (e) {
                $.response.status = $.net.http.BAD_REQUEST;
                $.response.setBody(e.message);
        }
    }());
}());