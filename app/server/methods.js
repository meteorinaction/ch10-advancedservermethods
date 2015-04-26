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
setTimeoutFor3sCb = function (value, cb) {
  var result = value;
  Meteor.setTimeout(function () {
    console.log('Result after timeout', result);
    cb(null, result + 3)
  }, 3000);
}
block = function (value, cb) {
  Meteor.setTimeout(function () {
    cb(null, true);
  }, 3000);
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
  },
  // wrapAsyncMethod
  'wrapAsyncMethod': function () {
    console.log('Method.wrapAsyncMethod');
    var returnValue = 0;
    returnValue = Meteor.wrapAsync(setTimeoutFor3sCb)(returnValue);
    console.log('resultComputation', returnValue);
    return returnValue;
  },
  // sequential
  'sequential': function (value) {
    console.log('Method.sequential', value);
    Meteor.wrapAsync(block)(value);
    console.log('Method.sequential returns', value);
    return true;
  },
  // unblock
  'unblock': function (value) {
    console.log('Method.unblock', value);
    this.unblock();
    Meteor.wrapAsync(block)(value);
    console.log('Method.unblock returns', value);
    return value;
  },
  // unboundEnvironment
  'unboundEnvironment': function () {
    console.log('Method.unboundEnvironment: ', Meteor.userId());

    setTimeoutFor3sCb(2, function () {
      console.log('3s later: ', Meteor.userId());
    });
  },
  // bindEnvironment
  'bindEnvironment': function () {
    console.log('Method.bindEnvironment: ', Meteor.userId());

    setTimeoutFor3sCb(2, Meteor.bindEnvironment(function () {
      console.log('Method.unboundEnvironment (3s delay): ', Meteor.userId());
    }));
  }

});