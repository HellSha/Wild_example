sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter"
], function (Controller, formatter) {
    "use strict";

    return Controller.extend("musician_ui.controller.Songs", {
        formatter: formatter,
        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("song").attachMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function (oEvent) {

            this.getView().bindElement({
				path: decodeURIComponent("/" + oEvent.getParameter("arguments").invoicePath),
				model: "musicians",
				parameters: {
					expand: "toSongs"
				},
			});
/*
            this.getView().bindElement({
                path: decodeURIComponent("/" + oEvent.getParameter("arguments").invoicePath),
                model: "musicians"
            });
            */
        },
        handleNavButtonPress: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("home");
        },
        onSelectionChange: function () {

        },
    });
});