// functions
addSync = function (a, b) {
  return a + b;
}
blockFor3s = function (value) {
  var waitUntil = new Date().getTime() + 3000;
  while (new Date().getTime() < waitUntil) {};
  return value;
}
setTimeoutFor3s = function (value) {
  var result = value;
  setTimeout(function () {
    result += 3;
    console.log('Result after timeout', result);
  }, 3000);
  return result;
}

// methods
Meteor.methods({
  // blockingMethod
  'blockingMethod': function (value) {
    console.log('Method.blockingMethod called');
    var returnValue = 0;
    resultComputation = blockFor3s(value);
    returnValue = addSync(resultComputation, 1);
    return returnValue;
  },
  // nonBlockingMethod
  'nonBlockingMethod': function () {
    console.log('Method.nonBlockingMethod');
    var returnValue = 0;
    returnValue = setTimeoutFor3s(returnValue);
    console.log('resultComputation', returnValue);
    return returnValue;
  }
});