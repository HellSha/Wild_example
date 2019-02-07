/**
@param {connection} Connection - The SQL connection used in the OData request
@param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
@param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
 */

function my_create_after_exit(param) {
    var after = param.afterTableName;
    //Get Input New Record Values
    var pName;
    pName = null;
    try {

        pStmt = param.connection
            .prepareStatement('select "HiMTA::usid".NEXTVAL from dummy');
        var rs = pStmt.executeQuery();
        var PersNo = '';
        while (rs.next()) {
            PersNo = rs.getString(1);
        }
        pStmt.close();
        pStmt = param.connection.prepareStatement("update\"" + after + "\"set \"usid\" = ?");
        pStmt.setString(1, PersNo);
        pStmt.execute();
        pStmt.close();

        pStmt = param.connection.prepareStatement('select * from "' + after + '"');
        rs = pStmt.executeQuery();
        while (rs.next()) {
            pName = rs.getString(1);
        }

        pStmt = param.connection
            .prepareStatement('insert into "HiMTA::User" values(?,?)');
        pStmt.setString(1, persNo);
        pStmt.setString(2, pName);     
        pStmt.executeUpdate();
        pStmt.close();

    } catch (e) {
        pStmt.close();
    }

}