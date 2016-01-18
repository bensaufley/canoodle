function createCanoodle() {
  var acceptedParams = {
      name: params.name
    },
    _id = Canoodles.insert(acceptedParams);
  this.redirect('canoodle.edit', { _id: _id });
}

function getOptions() {
  return Options.find({ canoodle_id: this._id });
}

if (Meteor.isClient) {
  Template.canoodlesIndex.helpers({
    canoodles: function() {
      return Canoodles.find({}, { sort: { createdAt: -1 }});
    }
  });

  Template.canoodleShow.helpers({
    options: getOptions,
    editable: function() {
      return false;
    }
  });

  Template.canoodleEdit.helpers({
    options: getOptions,
    editable: function() {
      return false;
    }
  });

  Template.canoodleEdit.events({
    'click #delete': function() {
      if (confirm('Are you sure you’d like to delete this canoodle?')) {
        Canoodles.remove(this._id);
        Router.go('canoodles.index');
      }
    },
    'click #add-option': function(e) {
      e.preventDefault();
      var _id = Options.insert({ canoodle_id: this._id, name: '', createdAt: new Date() });
    }
  });

  Template.canoodleNew.events({
    'submit #new-canoodle': function(e) {
      e.preventDefault();
      var params = {
          name: event.target['canoodle[name]'].value,
          createdAt: new Date()
        },
        _id = Canoodles.insert(params);
      Router.go('canoodle.edit', { _id: _id });
    }
  });
}
