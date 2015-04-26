Session.setDefault('selectedMethod');
Template.methods.helpers({
  methodName: function () {
    return [
      '',
      'blockingMethod',
      'nonBlockingMethod',
      'wrapAsyncMethod',
      'sequential',
      'unblock',
      'unboundEnvironment',
      'bindEnvironment'
    ];
  }
});
Template.methods.events = {
  'change #methodName': function (evt) {
    Session.set('selectedMethod', evt.currentTarget.value);
  },
  'click #callMethod': function (evt, tpl) {
    var methodName = Session.get('selectedMethod');
    var parameter = parseInt(tpl.$('#parameter').val());

    console.log(moment().format('HH:mm:ss') + ' calling ' + methodName + ' with parameter ' + parameter);
    Meteor.call(methodName, parameter, function (error, result) {
      console.log(moment().format('HH:mm:ss') + ' result: ' + result)
    });
  }
};