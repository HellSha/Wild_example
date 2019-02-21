sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("musician_ui.controller.App", {
        onInit: function () {},
        handleCreatePress: function(){
			MessageToast.show("Create button was pressed.");
            var name = this.byId("name").getValue(); 
            var age = this.byId("age").getValue();
            var descr = this.byId("descr").getValue();
            
            if(name.length === 0  || age.length == 0){
                MessageToast.show("Fill in, please, the requerdes fields: Name and Age.");
            } else{
                var obj = {};
                obj.name = name;
                obj.age = age;
                obj.description = descr;

                var insertObj = JSON.stringify(obj);

                 $.ajax({
                   type: "POST",
                   url: "https://p2001064106trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/musician/musician.xsjs",
                   contentType: "application/json",
                   data: insertObj,
                   dataType: "json",
                   crossDomain: true,
                   success: function(data) {               sap.ui.getCore().byId("details").getModel().refresh(true);
                      MessageToast.show("Data was inserted!");
                   },
                   error: function(data) {
                      var message = JSON.stringify(data);
                      alert(message);
                   }
                }); 
            }
        },
        handleSavePress: function() {
            MessageToast.show("Save button was pressed.");
        },
        handleCancelPress: function(){
            var table = this.getView().byId("details");
            var selectedRow = table.getSelectedItems();
            var index = table.indexOfItem(selectedRow);
            MessageToast.show(index);
        },
        handleDeletePress: function () {
            
            
        },
        onSelectionChange: function() {
            var table = this.getView().byId("details");
            var selectedRow = table.getSelectedItems();
            var index = table.indexOfItem(selectedRow);
            MessageToast.show("A ROW HAS BEEN CHOOSEN!");

        },
        onItemPress: function (oEvent) {
            var oItem = oEvent.getParameter("listItem") || oEvent.getSource();
            var oCtx = oItem.getBindingContext();
            var sPath = oCtx ? oCtx.getPath() : undefined;

            alert("List item pressed: Binding path: " + sPath);
        }
    });
});
