sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
], function (UIComponent, Device) {
	"use strict";

	return UIComponent.extend("musician_ui.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();

			/*
						$(function() {
							$.ajax({
							  type: "GET",
							  url: "/",
							  headers: {"X-Csrf-Token": "Fetch"},
							  success: function(res, status, xhr) {
								var sHeaderCsrfToken = "X-Csrf-Token";
								var sCsrfToken = xhr.getResponseHeader(sHeaderCsrfToken);
								$(document).ajaxSend(function(event, jqxhr, settings) {
								  if (settings.type==="POST" || settings.type==="PUT" || settings.type==="DELETE") {
									jqxhr.setRequestHeader(sHeaderCsrfToken, sCsrfToken);
								  }
								});
							  }
							});
							});
			*/
		}
	});
});