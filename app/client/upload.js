Template.upload.events({
  'change #file-upload': function (event, template) {
    console.log('base64');
    var file = event.target.files[0];
    var name = event.target.files[0].name;
    if (!file) return;

    // Only process image files.
    if (!file.type.match('image.*')) {
      alert('Only image files are allowed');
      return;
    }
    var reader = new FileReader(); //create a reader according to HTML5 File API
    reader.onload = function (file) {
      var result = reader.result;
      Meteor.call('saveFile', name, result);
    }
    Session.set('file', name);
    reader.readAsDataURL(file); //read the file as base64
  }
});