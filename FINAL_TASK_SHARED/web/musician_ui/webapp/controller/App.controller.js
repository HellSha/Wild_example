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
    this.validateMusician = function (oMusician) {
        if (oMusician.name.length === 0 || oMusician.age.length === 0) {
            MessageToast.show(getProperty("req_fields_error"));
            return false;
        } else {
            return true;
        }
    }
    this.updateTableView = function () {
        getViewModel().getModel("musicians").refresh(true);
    };
    this.createMusician = function (oMusician) {
        delete oMusician.update_time;
        delete oMusician.create_time;
        getViewModel().getModel("musicians").create("/Musicians", oMusician, {
            merge: false,
            success: function () {
                MessageToast.show(getProperty("create_success_info"));
                console.log(oMusician);
            },
            error: function (data) {
                var message = JSON.stringify(data);
                alert(message);
            }
        });
    };
    this.updateMusician = function (oMusician) {
        oMusician.update_time = null;
        oMusician.create_time = null;
        console.log(oMusician)
        getViewModel().getModel("musicians").update("/Musicians('" + oMusician.mid + "')", oMusician, {
            merge: false,
            success: function () {
                MessageToast.show(getProperty("update_success_info"));
            },
            error: function (data) {
                var message = JSON.stringify(data);
                alert(message);
            }
        });
    }

    return Controller.extend("musician_ui.controller.App", {
        onInit: function () {
            setViewModel(this.getView());
        },
        handleCreatePress: function () {
            var oMusician = this.getView().getModel("musician_config").getData();
            if (validateMusician(oMusician)) {
                createMusician(oMusician);
            }
        },
        handleSavePress: function () {
            var oMusician = this.getView().getModel("musician_config").getData();
            if (validateMusician(oMusician)) {
                updateMusician(oMusician);
            }
        },
        handleDeletePress: function () {
            var oMusician = this.getView().getModel("musician_config").getData();
            if (validateMusician(oMusician)) {
                var mid = oMusician.mid;
                $.ajax({
                    type: "DELETE",
                    url: "https://p2001064106trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/musician/musician.xsjs?mid=" + mid,
                    contentType: "application/json",
                    dataType: "json",
                    crossDomain: true,
                    success: function (data) {
                        MessageToast.show(getProperty("delete_success_info"));
                        updateTableView();
                    },
                    error: function (data) {
                        var message = JSON.stringify(data);
                        alert(message);
                    }
                });
            }
        },
        handleToSongPress: function () {
            var oTable = this.getView().byId("details");
            var selItem = oTable.getSelectedItem();

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

            oRouter.navTo("song", {
                invoicePath: encodeURIComponent(selItem.getBindingContext("musicians").getPath().substr(1))
            });
        },
        onSelectionChange: function () {
            var oTable = this.getView().byId("details");
            var obj = oTable.getSelectedItem().getBindingContext("musicians").getObject();

            this.byId("mid").setValue(obj.mid);
            this.byId("name").setValue(obj.name);
            this.byId("age").setValue(obj.age);
            this.byId("descr").setValue(obj.description);

        },
        onClearFormPress: function () {
            this.byId("mid").setValue("");
            this.byId("name").setValue("");
            this.byId("age").setValue("");
            this.byId("descr").setValue("");
        }
    });
});