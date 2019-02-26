sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter"
], function (Controller, formatter) {
    "use strict";
    var enableButtonStatus = [
        {enabled : "false"}
      ];

    return Controller.extend("musician_ui.controller.Songs", {
        formatter: formatter,
        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("song").attachMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function (oEvent) {
            var path = oEvent.getParameter("arguments").invoicePath;

            console.log(path);
            console.log(decodeURIComponent("/" + oEvent.getParameter("arguments").invoicePath));
			this.getView().bindElement({
				path: decodeURIComponent("/" + oEvent.getParameter("arguments").invoicePath),
				model: "songs"
			});
		},
        handleNavButtonPress: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("home");
        },
        onSelectionChange: function () {
            var oTable = this.getView().byId("details");           
            var selItem = oTable.getSelectedItem();
            var index = oTable.indexOfItem(selItem);
            selItem.getBindingContext("songs").getModel().refresh(true);

            var oSong = this.getView().getModel("songs").getData();
            console.log(oSong);
            oSong.enabled = true;


            var obj = oTable.getSelectedItem().getBindingContext("songs").getObject();
            console.log(obj);

        },
    });
});
