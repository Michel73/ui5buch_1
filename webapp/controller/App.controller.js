sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageBox"
], function(Controller, MessageBox) {
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
      console.log("Submit event", oEvent.getParameters().value);
      var inputValue = oEvent.getParameters().value;
      var oPageModel = this.getOwnerComponent().getModel("page");
      // oPageModel.person = inputValue;
      oPageModel.setProperty("/person", inputValue);
      console.log("pageModel.person: ", oPageModel.getProperty("/person"));

    }
  });
});
