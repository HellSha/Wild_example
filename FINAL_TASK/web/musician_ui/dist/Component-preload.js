jQuery.sap.registerPreloadedModules({version:"2.0",name:"musician_ui/Component-preload",modules:{"musician_ui/Component.js":'sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device"],function(i,n){"use strict";return i.extend("musician_ui.Component",{metadata:{manifest:"json"},init:function(){i.prototype.init.apply(this,arguments)}})});',"musician_ui/controller/App.controller.js":'sap.ui.define(["sap/ui/core/mvc/Controller"],function(n){"use strict";return n.extend("musician_ui.controller.App",{onInit:function(){}})});',"musician_ui/view/App.view.xml":'<mvc:View controllerName="musician_ui.controller.App" xmlns="sap.m" xmlns:l="sap.ui.layout" xmlns:mvc="sap.ui.core.mvc"><Shell><App><pages><Page><Panel id="PeopleDetailPanel" headerText="List of Users:" class="sapUiResponsiveMargin" width="auto"><content><Table id="details" items = "{\r\n      path: \'users>/Users\'\r\n      }"><columns><Column id="userIdColumn"><Text text="{i18n>userID}" /></Column><Column id="userNameColumn"><Text text="{i18n>userName}" /></Column></columns><items><ColumnListItem><cells><Label text="{users>usid}" /></cells><cells><Label text="{users>name}" /></cells></ColumnListItem></items></Table></content></Panel></Page></pages></App></Shell></mvc:View>',"musician_ui/i18n/i18n.properties":"userID=ID\r\nuserName=Name","musician_ui/manifest.json":'{"_version":"1.8.0","sap.app":{"id":"musician_ui","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{appTitle}}","description":"{{appDescription}}","sourceTemplate":{"id":"html5moduletemplates.basicSAPUI5ApplicationProjectModule","version":"1.40.12"},"dataSources":{"mainService":{"uri":"https://p2001064106trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata","type":"OData","settings":{"odataVersion":"2.0"}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true},"supportedThemes":["sap_hcb","sap_belize"]},"sap.ui5":{"rootView":{"viewName":"musician_ui.view.App","type":"XML","async":true,"id":"display"},"dependencies":{"minUI5Version":"1.60.1","libs":{"sap.ui.core":{},"sap.m":{},"sap.ui.layout":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"musician_ui.i18n.i18n"}},"users":{"dataSource":"mainService","settings":{"defaultBindingMode":"TwoWay","defaultCountMode":"Inline","useBatch":false,"disableHeadRequestForToken":true}}}},"resources":{}}'}});