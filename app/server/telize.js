//functions
var apiCall = function (apiUrl, callback) {
  try {
    var response = HTTP.get(apiUrl).data;
    callback(null, response);
  } catch (error) {
    if (error.response) {
      var errorCode = error.response.data.code;
      var errorMessage = error.response.data.message;
    } else {
      var errorCode = 500;
      var errorMessage = 'Cannot access the API';
    }
    var myError = new Meteor.Error(errorCode, errorMessage);
    callback(myError, null);
  }
}

// methods
Meteor.methods({
  'geoJsonForIp': function (ip) {
    this.unblock();
    var apiUrl = 'http://www.telize.com/geoip/' + ip;
    var response = Meteor.wrapAsync(apiCall)(apiUrl);
    return response;
  }
});