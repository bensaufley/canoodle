function createNoodle() {
  var acceptedParams = {
      name: params.name
    },
    _id = Noodles.insert(acceptedParams);
  this.redirect('noodle.edit', { _id: _id });
}

function getOptions() {
  return Options.find({ noodle_id: this._id });
}

if (Meteor.isClient) {
  Template.noodlesIndex.helpers({
    noodles: function() {
      return Noodles.find({}, { sort: { createdAt: -1 }});
    }
  });

  Template.noodleShow.helpers({
    options: getOptions,
    editable: function() {
      return false;
    }
  });

  Template.noodleEdit.helpers({
    options: getOptions,
    editable: function() {
      return false;
    }
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
