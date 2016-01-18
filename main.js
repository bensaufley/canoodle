Noodles = new Mongo.Collection('noodles');
Options = new Mongo.Collection('options');
Votes = new Mongo.Collection('votes');

if (Meteor.isClient) {
  Meteor.subscribe('noodles');
  Meteor.subscribe('options');
  Meteor.subscribe('votes');

  Template.appLayout.helpers({
    notifications: function() {
      return Session.get('displayMessages');
    },
    year: function() {
      return new Date().getFullYear();
    }
  });

  Template.appLayout.events({
    'click [data-close]': function() {
      var self = this,
          messages = Session.get('displayMessages');
      Session.set('displayMessages',
        _.reject(messages, function(obj) {
          return _.isEqual(obj, self);
        })
      );
    }
  });

  Template.appLayout.onRendered(function() {
    $(document).foundation();
  });

  Template.nav.events({
    'click #logout': function(e) {
      e.preventDefault();
      Meteor.logout(function() {
        Session.set('displayMessages', [{
          type: 'success',
          text: '<h4>Goodbye</h4><p>You\'ve been successfully logged out.</p>'
        }]);
      });
    }
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
  Meteor.publish('noodles', function() {
    return Noodles.find({});
  });
  Meteor.publish('options', function() {
    var userId = this.userId;
    return Options.find({$or: [ { saved: true }, { $where: function() { return db.noodles.findOne({ _id: this.noodle_id }).createdAt == userId } } ] });
  });
  Meteor.publish('votes', function() {
    return Votes.find({});
  });
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
