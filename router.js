var IRHooks = {
  isLoggedIn: function() {
    if (Meteor.loggingIn() || Meteor.user()) {
      return true;
    } else {
      Session.set('displayMessages', [ { type: 'alert', text: '<p>Must log in to access this content.</p>' } ])
      this.redirect('noodles.index');
      this.next();
    }
  },
  canAccess: function(_id) {
    if (!Meteor.user() || Meteor.userId() != _id) {
      Session.set('displayMessages', [ { type: 'alert', text: '<p>Must log in as proper use to access this content.</p>' } ])
      this.redirect('noodles.index');
      this.next();
    } else {
      return true;
    }
  }
};

function findNoodle() {
  return Noodles.findOne(this.params._id);
}

Router.route('/', { name: 'noodles.index' });
Router.route('/noodles/new', { name: 'noodle.new' });
Router.route('/noodles/:_id', {
  name: 'noodle.show',
  data: findNoodle
});

Router.route('/noodles/:_id/edit', {
  name: 'noodle.edit',
  onBeforeAction: function() {
    if (IRHooks.canAccess(findNoodle.call(this).createdBy)) {
      this.next();
    }
  },
  data: findNoodle
});

Router.route('/noodles', { where: 'server' })
  .get(function() { return this.redirect('noodles.index'); })
  .post(function() {
    var acceptedParams = {
        name: this.params.name,
        createdAt: new Date()
      },
      _id = Noodles.insert(acceptedParams);
    this.redirect('noodle.edit', { _id: _id });
  });

Router.route('/create-account', { name: 'register' })

if (Meteor.isClient) {
  ApplicationController = RouteController.extend({
    layoutTemplate: 'appLayout',
    loadingTemplate: 'loading',
    waitOn: function() {
      return function() { return !Meteor.loggingIn(); };
    },

    onBeforeAction: function () {
      console.log('app before hook!');
      this.next();
    }
  });

  Router.configure({ controller: 'ApplicationController' });
}
