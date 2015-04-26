Meteor.methods({
  'geoJsonForIp': function (ip) {
    console.log('Method.geoJsonForIp for', ip);
    var apiUrl = 'http://www.telize.com/geoip/' + ip;
    var response = HTTP.get(apiUrl).data;
    return response;
  }
});