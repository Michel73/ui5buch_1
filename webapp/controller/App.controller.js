sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageBox",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function(Controller, MessageBox, Filter, FilterOperator) {
  "use strict";

  return Controller.extend("de.sapui5buch.demo.controller.App", {
    onInit: function() {
    },
    onPress: function() {
      var sInputValue = this.byId("idInputField").getValue();
      MessageBox.show("Hallo " + sInputValue, {
        icon: MessageBox.Icon.INFORMATION,
        title: "Willkommen"
      });
    },
    onSubmit: function(oEvent) {
      var inputValue = oEvent.getParameters().value;
      var oPageModel = this.getOwnerComponent().getModel("page");
      // oPageModel.person = inputValue;
      oPageModel.setProperty("/person", inputValue);
    },
    onSuggest: function(oEvent) {
      var sTerm = oEvent.getParameter("suggestValue");
      // console.log("Filter: ", sTerm)
      var aFilters = [];
      if (sTerm) {
        aFilters.push(new Filter("BusinessPartnerID", FilterOperator.StartsWith, sTerm));
      }
      oEvent.getSource().getBinding("suggestionItems").filter(aFilters);
    }
  });
});
