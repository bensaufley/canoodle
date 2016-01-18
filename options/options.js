if (Meteor.isClient) {
  function deleteOption(e) {
    if (confirm('Are you sure you wish to remove this option?')) {
      return Options.remove({ _id: this._id });
    }
    return false;
  }

  Template.optionEdit.events({
    'submit .option': function(e) {
      e.preventDefault();
      return Options.update({ _id: this._id }, { $set: { name: e.target['option[name]'].value, saved: true } });
    },
    'click .delete-option': deleteOption,
    'click .cancel-option': function(e) {
      e.preventDefault();
      var option = Options.findOne({ _id: this._id });
      if (option.name) {
        Options.update({ _id: option._id }, { $set: { saved: true } });
      } else {
        Options.remove({ _id: option._id });
      }
    }
  });

  Template.optionShow.events({
    'click .delete-option': deleteOption,
    'click .edit-option': function(e) {
      e.preventDefault();
      console.log('edit!');
      return Options.update({ _id: this._id }, { $set: { saved: false } });
    }
  });
}
