function createNoodle() {
  var acceptedParams = {
      name: params.name,
      createdBy: Meteor.userId()
    },
    _id = Noodles.insert(acceptedParams);
  this.redirect('noodle.edit', { _id: _id });
}

function getOptions() {
  return Options.find({ noodle_id: this._id });
}

if (Meteor.isClient) {
  Template.noodlesIndex.helpers({
    myNoodles: function() {
      if (!Meteor.user()) return;
      return Noodles.find({ createdBy: Meteor.userId() }, { sort: { createdAt: -1 } });
    },
    noodles: function() {
      var params = {};
      if (Meteor.user()) {
        params.$not = { createdBy: Meteor.userId() };
      }
      return Noodles.find(params, { sort: { createdAt: -1 }});
    }
  });

  Template.noodleShow.helpers({
    options: getOptions,
    editable: function() {
      return Meteor.user() && Meteor.userId() == this.createdBy;
    }
  });

  Template.noodleEdit.helpers({
    options: getOptions
  });

  Template.noodleEdit.events({
    'click #delete': function() {
      if (confirm('Are you sure you’d like to delete this noodle?')) {
        Noodles.remove(this._id);
        Router.go('noodles.index');
      }
    },
    'click #add-option': function(e) {
      e.preventDefault();
      var _id = Options.insert({ noodle_id: this._id, name: '', createdAt: new Date() });
    }
  });

  Template.noodleNew.events({
    'submit #new-noodle': function(e) {
      e.preventDefault();
      var params = {
          name: event.target['noodle[name]'].value,
          createdAt: new Date()
        },
        _id = Noodles.insert(params);
      Router.go('noodle.edit', { _id: _id });
    }
  });
}
