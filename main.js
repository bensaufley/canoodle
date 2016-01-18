Canoodles = new Mongo.Collection('canoodles');
Options = new Mongo.Collection('options');
Votes = new Mongo.Collection('votes');

if (Meteor.isClient) {
  Template.AppLayout.helpers({
    year: function() {
      return new Date().getFullYear();
    }
  });

  Template.AppLayout.onRendered(function() {
    $(document).foundation()
  });

  Template.registerHelper('when', function() {
    if (!this.createdAt) return;
    return this.createdAt.getFullYear() + '-' +
          (this.createdAt.getMonth() + 1) + '-' +
          this.createdAt.getDate() + ' ' +
          (this.createdAt.getHours()%12) + ':' +
          this.createdAt.getMinutes() +
          (this.createdAt.getHours() >= 12 ? 'pm' : 'am');
  });

  Template.registerHelper('isTrue', function(x) {
    return x == 'true';
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
