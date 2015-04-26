Session.setDefault('file', 'image.png');
Tracker.autorun(function (computation) {
  Meteor.subscribe('files', Session.get('file'));
});