Meteor.publish('files', function (file) {
  console.log('publish', file);
  return FilesCollection.find({
    name: file
  });
});