sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"xyz/x/model/models"
], function (Controller,MessageBox,Models) {
	"use strict";
	return 	Controller.extend("xyz.x.controller.view1",{
			onInit:function(){
				this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			},
			// next:function(){
			// 	sap.ui.getCore().byId("idApp").to("idView2");
			// },
			orange:function(){
				MessageBox.show("Hi");
			},
			onDelete:function(oEvent){
				var oSelect = oEvent.getSource();
				var oListItem = oEvent.getParameter("listItem");
				oSelect.removeItem(oListItem);
			},
			
			onSelectItem:function(oEvent){
				var oItem =	oEvent.getParameter("listItem").getBindingContextPath();
				this.oRouter.navTo("detail",{
					fruitsId : oItem.split("/")[oItem.split("/").length-1]
				});
				// var oClose = oEvent.getSource().getParent().getParent().getParent().getParent();
				// oClose.hideMaster();
				// var oItem =	oEvent.getParameter("listItem").getBindingContextPath();
				// var oView2 = sap.ui.getCore().byId("idView2");
				// oView2.bindElement(oItem);
				// this.next();
					
			},
			onSearch:function(oEvent){
				debugger;
				var oSearch = oEvent.getParameter("query");
				if(!oSearch){
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
					filters:[oSearchName,oSearchColor],
					and:false
					
				}); 
				var aFilter = [oFilter];
				var oList = this.getView().byId("idFruits");
				oList.getBinding("items").filter(aFilter);
				
			},
			onSuggest:function(oEvent){
			 //oEvent.getParameter("suggestValue");
				oEvent.getSource().suggest();
			}
		});
	
});