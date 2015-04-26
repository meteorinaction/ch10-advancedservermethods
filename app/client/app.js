Session.setDefault('selectedMethod');
Template.methods.helpers({
  methodName: function () {
    return [];
  }
});
Template.methods.events = {
  'change #methodName': function (evt) {
    Session.set('selectedMethod', evt.currentTarget.value);
  },
  'click #callMethod': function (evt, tpl) {
    var parameter = tpl.$('#parameter').val();
    console.log(Session.get('selectedMethod'), parameter);
  }
};