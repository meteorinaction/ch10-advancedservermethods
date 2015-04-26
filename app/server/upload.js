Meteor.methods({
  'saveFile': function (name, buffer) {
    FilesCollection.insert({
      name: name,
      base64: buffer
    })
  }
});