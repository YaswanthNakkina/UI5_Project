sap.ui.define(
	["sap/ui/core/UIComponent",
		"xyz/x/model/models"
	],
	function (UIComponent, Models) {
		return UIComponent.extend("xyz.x.Component", {
			metadata: {
			"manifest":"json"
			},
			init: function () {
				sap.ui.core.UIComponent.prototype.init.apply(this);
				var oRouter = this.getRouter();
				oRouter.initialize();
			},
			// createContent: function (){
			// 	var oAppView = new sap.ui.view({
			// 			id :"idAppView",
			// 			viewName : "xyz.x.view.App",
			// 			type : sap.ui.core.mvc.ViewType.XML
			// 		});

			// 	// 	var oModel = Models.createFruitModel();
			// 	// oAppView.setModel(oModel);

			// 	var oView1 = new sap.ui.view({
			// 		id: "idView1",
			// 		viewName: "xyz.x.view.view1",
			// 		type: sap.ui.core.mvc.ViewType.XML
			// 	});
			// 	var oView2 = new sap.ui.view({
			// 		id: "idView2",
			// 		viewName: "xyz.x.view.view2",
			// 		type: sap.ui.core.mvc.ViewType.XML
			// 	});

			// 	oAppView.byId("idSplitApp").addMasterPage(oView1);
			// 	oAppView.byId("idSplitApp").addDetailPage(oView2);

			// 	return oAppView;
			// },
			destroy: function () {

			}
		});
	});