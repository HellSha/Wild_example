sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";
    return Controller.extend("musician_ui.controller.App", {
        onInit: function () {},
        openCreateDialog: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

            oRouter.navTo("create", {
                invoicePath: encodeURIComponent(oItem.getBindingContext("musicians").getPath().substr(1))
            });
            /*
            var oFirstDialog;
            oFirstDialog = new sap.ui.commons.Dialog({
                width: "400 px",
                height: "550 px",
                title: "Musician Details",
                applyContentPadding: true,
                modal: true,
                content: [new sap.ui.commons.form.SimpleForm({
                    content: [
               new sap.ui.core.Title({
                            text: "Country Name"
                        }),
               new sap.ui.commons.Label({
                            text: "id"
                        }),
               new sap.ui.commons.TextField({
                            value: "",
                            id: "id"
                        }),
               new sap.ui.commons.Label({
                            text: "name"
                        }),
               new sap.ui.commons.TextField({
                            value: "",
                            id: "name"
                        }),
               new sap.ui.commons.Label({
                            text: "age"
                        }),
               new sap.ui.commons.TextField({
                            value: "",
                            id: "age"
                        }),
               new sap.ui.commons.Label({
                            text: "description"
                        }),
               new sap.ui.commons.TextField({
                            value: "",
                            id: "descr"
                        })
            ]
                })]
            });

            oFirstDialog.addButton(new sap.ui.commons.Button({
                text: "Create",
                press: function () {
                    var id = sap.ui.getCore().byId("id").getValue();
                    var name = sap.ui.getCore().byId("name").getValue();
                    var age = sap.ui.getCore().byId("age").getValue();
                    var descr = sap.ui.getCore().byId("descr").getValue();
                    var payload = {};
                    payload.id = id;
                    payload.name = name;
                    payload.age = age;
                    payload.descr = descr;
                    var insertdata = JSON.stringify(payload);
                    $.ajax({
                        type: "POST",
                        url: "",
                        contentType: "application/json",
                        data: insertdata,
                        dataType: "json",
                        crossDomain: true,
                        success: function (data) {
                            oFirstDialog.close();
                            
                            var oTable = this.getView().byId('details');
                            var selItem = oTable.getSelectedItem();
                            selItem.getBindingContext("musicians").getModel().refresh(true);
                            alert(“Data inserted successfully”);
                        },
                        error: function (data) {
                            var message = JSON.stringify(data);
                            alert(message);
                        }
                    });
                }
            }));
            oFirstDialog.open();
            */
        },
        onItemPress: function (oEvent) {
            var oItem = oEvent.getParameter("listItem") || oEvent.getSource();
            var oCtx = oItem.getBindingContext();
            var sPath = oCtx ? oCtx.getPath() : undefined;

            alert("List item pressed: Binding path: " + sPath);
        }
    });
});
