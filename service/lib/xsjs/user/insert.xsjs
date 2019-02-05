var user = function (connection) {
$.response.contentType = "application/text";
var body='';
var aCmd = JSON.stringify($.request.body);
var obj=JSON.parse(aCmd);
var usid= getNextval("HiMTA::usid");
var name=obj.name;
function getTxtData()
{
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
};