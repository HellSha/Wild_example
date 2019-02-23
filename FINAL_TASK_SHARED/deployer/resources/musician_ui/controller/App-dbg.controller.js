sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("musician_ui.controller.App", {
        onInit: function () {
		},
        handleCreatePress: function(){
            var name = this.byId("name").getValue(); 
            var age = this.byId("age").getValue();
            var descr = this.byId("descr").getValue();
            
            if(name.length === 0  || age.length === 0){
                MessageToast.show("Fill in, please, the requerdes fields: Name and Age.");
            } 
            else{
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
                success: function(data) {               
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
            var name = this.byId("name").getValue(); 
            var age = this.byId("age").getValue();
            var descr = this.byId("descr").getValue();
            
            if(name.length === 0  || age.length === 0){
                MessageToast.show("Fill in, please, the requerdes fields: Name and Age.");
            }
            else{
                var obj = {};
                obj.name = name;
                obj.age = age;
                obj.description = descr;
                
                var insertObj = JSON.stringify(obj);
                
                $.ajax({
                type: "PUT",
                url: "https://p2001064106trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/musician/musician.xsjs",
                contentType: "application/json",
                data: insertObj,
                dataType: "json",
                crossDomain: true,
                success: function(data) {               
                    MessageToast.show("Data was inserted!");
                },
                error: function(data) {
                    var message = JSON.stringify(data);
                    alert(message);
                }
                }); 
                //MessageToast.show("Save button was pressed.");
            }
        },
        handleCancelPress: function(){
            this.byId("name").setValue(""); 
            this.byId("age").setValue("");
            this.byId("descr").setValue("");
        },
        handleDeletePress: function () {
            var oTable = this.getView().byId("details");
            var selItem = oTable.getSelectedItem();
            var obj = oTable.getSelectedItem().getBindingContext("musicians").getObject();
            selItem.getBindingContext("musicians").getModel().refresh(true);

/*
            var oTable = this.getView().byId("details");
            var oModel = oTable.getModel();
            var oContetxs = oTable.getSelectedContext();
            */
            console.log(selItems);
            /*
            var oTable = this.getView().byId("details");
            var oItem = oTable.getSelectedItem();
            var index = oTable.IndexOfItem(oItem);

            if(index == -1){
                MessageToast.show("");
            }
            this.byId("name").getValue(); 
*/
/*
            var oTable = this.getView().byId("details");
            console.log(oTable);
            var obj = oTable.getSelectedItem().getBindingContext("musicians").getObject();
            var delPar = JSON.stringify(obj.mid);
            
            $.ajax({
              type: "DELETE",
              url: "https://p2001064106trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/musician/musician.xsjs",
              contentType: "application/json",
              data: delPar,
              dataType: "json",
              crossDomain: true,
              success: function(data) {               
                 MessageToast.show("Musician " + obj.name + " was deleted!");
              },
              error: function(data) {
                 var message = JSON.stringify(data);
                 alert(message);
              }
           }); 
*/
            
        },
        onSelectionChange: function() {
           // MessageToast.show("A ROW HAS BEEN CHOOSEN!");

            var oTable = this.getView().byId("details");
            
            var selItem = oTable.getSelectedItem();
            var obj = oTable.getSelectedItem().getBindingContext("musicians").getObject();
            selItem.getBindingContext("musicians").getModel().refresh(true);
            
            this.byId("name").setValue(obj.name); 
            this.byId("age").setValue(obj.age);
            this.byId("descr").setValue(obj.description);

            this.byId("del").setEnabled(true);

            //MessageToast.show(obj.mid);
            return obj;
            /*
            var name = this.byId("labelName").getValue(); 
            var age = this.byId("labelAge").getValue();
            var descr = this.byId("labelDescr").getValue();
            */
           /*
            console.log(obj);
            MessageToast.show(obj.name);
            
            /*
            this.byId("name").setValue(name); 
            this.byId("age").setValue(age);
            this.byId("descr").setValue(descr);
            */
        },
        fillFormInfo: function(){
            
        },
        getMusicianInfoForm: function(){
            var name = this.byId("name").getValue(); 
            var age = this.byId("age").getValue();
            var descr = this.byId("descr").getValue();
            
            var obj = {};
            obj.name = name;
            obj.age = age;
            obj.description = descr;
            
            return obj;
        },
        onItemPress: function (oEvent) {
            var oItem = oEvent.getParameter("listItem") || oEvent.getSource();
            var oCtx = oItem.getBindingContext();
            var sPath = oCtx ? oCtx.getPath() : undefined;

            alert("List item pressed: Binding path: " + sPath);
        }
    });
});
