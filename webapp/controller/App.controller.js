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
    onValueHelpRequest: function(oEvent) {
      var sInputValue = oEvent.getSource().getValue();
      this._sInputId = oEvent.getSource().getId();
      if (!this._oValueHelpDialog) {
        this._oValueHelpDialog = sap.ui.xmlfragment("de.sapui5buch.demo.view.SelectDialog", this);
        this.getView().addDependent(this._oValueHelpDialog);
      }
      this._oValueHelpDialog.getBinding("items").filter(
        [new Filter("BusinessPartnerID", FilterOperator.Contains, sInputValue)]
      );
      this._oValueHelpDialog.open(sInputValue);
    },
    onSearch: function(oEvent) {
      var sValue = oEvent.getParameter("value");
      var oFilter = new Filter("BusinessPartnerID", FilterOperator.Contains, sValue);
      oEvent.getSource().getBinding("items").filter([oFilter]);
    },
    onClose: function(oEvent) {
      var oSelectedItem = oEvent.getParameter("selectedItem");
      if (oSelectedItem) {
        this._updateUI(oSelectedItem.getBindingContext().getPath());
      }
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
    },
    onSuggestionItemSelected: function(oEvent) {
      var oSelectedItem = oEvent.getParameter("selectedItem");
      var sBindingPath = oSelectedItem.getBindingContext().getPath();
      this._updateUI(sBindingPath);
    },
    _updateUI: function(sBindingPath) {
      var oHeaderContent = this.byId("headerContent");
      oHeaderContent.bindElement(sBindingPath);
      var oAdrSection = this.byId("addressSection");
      oAdrSection.setVisible(true);
      oAdrSection.bindElement(sBindingPath + "/Address");
      var oObjLayout = this.byId("ObjectPageLayout");
      oObjLayout.setShowHeaderContent(true);
      oObjLayout.setToggleHeaderOnTitleClick(true);
    }
  });
});
