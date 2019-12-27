sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("xyz.x.controller.view3", {
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.attachRoutePatternMatched(this.onSuppSelect, this);
		},
		onSuppSelect: function (oEvent) {
			this.byId("rating").reset();
			var sPath = oEvent.getParameter("arguments").supId;
			sPath = "/Supplier/" + sPath;
			this.getView().bindElement(sPath);
		},
		onRatingChange: function (oEvent) {
			var fValue = oEvent.getParameter("value");
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

			MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
		}

	});

});