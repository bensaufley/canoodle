function findCanoodle() {
  return Canoodles.findOne(this.params._id);
}

Router.route('/', { name: 'canoodles.index' });
Router.route('/canoodles/new', { name: 'canoodle.new' });
Router.route('/canoodles/:_id', {
  name: 'canoodle.show',
  data: findCanoodle
});

Router.route('/canoodles/:_id/edit', {
  name: 'canoodle.edit',
  data: findCanoodle
});

Router.route('/canoodles', { where: 'server' })
  .get(function() { return this.redirect('canoodles.index'); })
  .post(function() {
    var acceptedParams = {
        name: this.params.name,
        createdAt: new Date()
      },
      _id = Canoodles.insert(acceptedParams);
    this.redirect('canoodle.edit', { _id: _id });
  });

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
