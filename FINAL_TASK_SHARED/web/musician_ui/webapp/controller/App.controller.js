sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    var oViewModel;

    this.getViewModel = function () {
        return oViewModel;
      };
      this.setViewModel = function (value) {
        oViewModel = value;
      };
    this.getProperty = function (property) {
        return getViewModel().getModel("i18n").getResourceBundle().getText(property);
      };
    this.updateTableView = function (){
        getViewModel().getModel("musicians").refresh(true);
    };

    return Controller.extend("musician_ui.controller.App", {
        onInit: function () {
            setViewModel(this.getView());
        },
        handleCreatePress: function(){
            //TO SEPERATE:create Object
            var name = this.byId("name").getValue(); 
            var age = this.byId("age").getValue();
            var descr = this.byId("descr").getValue();
            var oTable = this.getView().byId("details");
            var oTableItemsBinding = oTable.getBindingContext("musicians");
            
            if(name.length === 0  || age.length === 0){
                MessageToast.show(getProperty("req_fields_error"));
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
                    MessageToast.show(getProperty("create_success_info"));
                    updateTableView();
                    getViewModel().byId("mid").setValue("");
                    getViewModel().byId("name").setValue(""); 
                    getViewModel().byId("age").setValue("");
                    getViewModel().byId("descr").setValue("");
                },
                error: function(data) {
                    var message = JSON.stringify(data);
                    alert(message);
                }
                });
            } 
        },
        handleSavePress: function() {
            var mid = this.byId("mid").getValue(); 
            var name = this.byId("name").getValue(); 
            var age = this.byId("age").getValue();
            var descr = this.byId("descr").getValue();
            
            if(name.length === 0  || age.length === 0){
                MessageToast.show(getProperty("req_fields_error"));
            }
            else{
                var obj = {};
                obj.mid = mid;
                obj.name = name;
                obj.age = age;
                obj.descr = descr;
                
                var insertObj = JSON.stringify(obj);
                //SEND THE REQUEST    
                $.ajax({
                type: "PUT",
                url: "https://p2001064106trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/musician/musician.xsjs",
                contentType: "application/json",
                data: insertObj,
                dataType: "json",
                crossDomain: true,
                success: function(data) {               
                    MessageToast.show(getProperty("update_success_info"));
                    updateTableView();
                },
                error: function(data) {
                    var message = JSON.stringify(data);
                    alert(message);
                }
                }); 
            }
        },
        handleDeletePress: function () {  
            var mid = this.byId("mid").getValue();           
            if(mid.length === 0){
                MessageToast.show(getProperty("choose_row_error"));
            }
            else{        
                //SEND THE REQUEST    
                $.ajax({
                type: "DELETE",
                url: "https://p2001064106trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/musician/musician.xsjs?mid=" + mid,
                contentType: "application/json",
                dataType: "json",
                crossDomain: true,
                success: function(data) {               
                    MessageToast.show(getProperty("delete_success_info"));
                    updateTableView();
                },
                error: function(data) {
                    var message = JSON.stringify(data);
                    alert(message);
                }
                }); 
            }


            //var obj = oTable.getSelectedItem().getBindingContext("musicians").getObject();
            //selItem.getBindingContext("musicians").getModel().refresh(true);

/*
            var oTable = this.getView().byId("details");
            var oModel = oTable.getModel();
            var oContetxs = oTable.getSelectedContext();
            */
            //console.log(selItems);
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
            console.log(oTable);
            var selItem = oTable.getSelectedItem();
            var index = oTable.indexOfItem(selItem);

            var obj = oTable.getSelectedItem().getBindingContext("musicians").getObject();
            console.log(obj);
            selItem.getBindingContext("musicians").getModel().refresh(true);
            
            this.byId("mid").setValue(obj.mid);
            this.byId("name").setValue(obj.name); 
            this.byId("age").setValue(obj.age);
            this.byId("descr").setValue(obj.description);

            if(index == -1){
                MessageToast.show("Choose a row!");
            }
            else{
                //this.byId("del").setEnabled(true);
                //MessageToast.show(index);
            }
        }
    });
});
