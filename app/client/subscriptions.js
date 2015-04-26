Tracker.autorun(function (computation) {
  Meteor.subscribe('files', Session.get('file'));
});