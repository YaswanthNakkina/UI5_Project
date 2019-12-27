sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"xyz/x/model/models",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function (Controller, models, MessageBox, MessageToast) {
	"use strict";
	return Controller.extend("xyz.x.controller.view2", {

		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.attachRoutePatternMatched(this.onSelect, this);
		},
		onSelect: function (oEvent) {
			var sPath = oEvent.getParameter("arguments").fruitsId;
			sPath = "/fruits/" + sPath;
			this.getView().bindElement(sPath);
		},
		oSupPopup:null,
		onFilter:function(){
			if(!this.oSupPopup){
				this.oSupPopup = new sap.ui.xmlfragment("xyz.x.fragments.popup",this);
				this.getView().addDependent(this.oSupPopup);
				this.oSupPopup.setTitle("Supplier");
				this.oSupPopup.bindAggregation("items",{
					path:"/Supplier",
					template: new sap.m.DisplayListItem({
						label:"{supName}",
						value:"{supContactInfo}"
					})
				});
			}	
			this.oSupPopup.open();
		},
		onApprove: function (oEvent) {
			var a = oEvent.getSource().getParent().getParent().mAggregations.content[0].mProperties.title;
			MessageBox.confirm("Please Confirm the Item" + " " + a, {
				title: "Sure",
				onClose: function (status) {
					if (status === "OK") {
						MessageToast.show("Item Successfully Approved ");
					}
				}

			});
		},
		onSupplierSelect:function(oEvent){
			var oSuppPath = oEvent.getSource().getBindingContextPath();
			this.oRouter.navTo("supDetail",{
				supId : oSuppPath.split("/")[oSuppPath.split("/").length-1]
			});
		},
		supplierDetails: null,
		oInp: null,
		confirmPopUp: function(oEvent){
			var selectedItem = oEvent.getParameter("selectedItem");
			this.oInp.setValue(selectedItem.getLabel());
			
		},
		onRequest: function (oEvent) {
			this.oInp = oEvent.getSource();
			if (!this.supplierDetails) {
				this.supplierDetails = new sap.ui.xmlfragment("xyz.x.fragments.popup",this);
				this.supplierDetails.setTitle("City");
			
				this.getView().addDependent(this.supplierDetails);
				
					this.supplierDetails.attachConfirm(this.confirmPopUp.bind(this));
					
				this.supplierDetails.bindAggregation("items", {
					path: "/Supplier",
					template: new sap.m.DisplayListItem({
						label: "{supCity}",
						value: "{supName}"
					})
				});
			}
			this.supplierDetails.open();
		},
		onSearch1: function (oEvent) {
			var oSearch = oEvent.getParameter("query");
			if (!oSearch) {
				oSearch = oEvent.getParameter("newValue");
			}
			var oSearchName = new sap.ui.model.Filter(
				"fruitName",
				sap.ui.model.FilterOperator.Contains,
				oSearch
			);

			var oSearchColor = new sap.ui.model.Filter(
				"color",
				sap.ui.model.FilterOperator.Contains,
				oSearch
			);

			var oFilter = new sap.ui.model.Filter({
				filters: [oSearchName, oSearchColor],
				and: false
			});

			var aFilter = [oFilter];
			var oList = oEvent.getSource().getParent().getParent().getParent().getParent().getParent().getParent().getAggregation("_navMaster")
				.getAggregation("pages")[0].getAggregation("content")[0].getAggregation("content")[0];
			oList.getBinding("items").filter(aFilter);
		}

	});

});