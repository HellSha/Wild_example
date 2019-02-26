sap.ui.define([], function () {
	"use strict";
	return {
		statusText: function (status) {
            switch(status){
                case "enabled" :
                     return enableButtonStatus.enabled = "enabled";
                case "disabled" :
                     return enableButtonStatus.enabled = "disabled";
                default:
                     return enableButtonStatus.enabled = "disabled";
            }
		}
	};
});