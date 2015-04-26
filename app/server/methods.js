addSync = function (a, b) {
  return a + b;
}
blockFor3s = function (value) {
  var waitUntil = new Date().getTime() + 3000;
  while (new Date().getTime() < waitUntil) {};
  return value;
}
Meteor.methods({
  'blockingMethod': function (value) {
    console.log('Method.blockingMethod called');
    var returnValue = 0;
    resultComputation = blockFor3s(value);
    returnValue = addSync(resultComputation, 1);
    return returnValue;
  }
});