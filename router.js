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

    onBeforeAction: function () {
      console.log('app before hook!');
      this.next();
    }
  });

  Router.configure({ controller: 'ApplicationController' });
}
