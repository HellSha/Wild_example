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

            path.replace(/[^0-9]/g, "");
            console.log(path);
            
			this.getView().bindElement({
				path: decodeURIComponent("/" + oEvent.getParameter("arguments").invoicePath),
				model: "songs"
			});
		},
        handleNavButtonPress: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("home");
        }
    });
});
