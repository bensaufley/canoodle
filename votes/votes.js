function inputName() {
  return ('vote[' + this._id + '][value]');
}

if (Meteor.isClient) {
  Template.voteEdit.helpers({
    checkboxId: function(val) {
      return (inputName.call(this) + '_' + val).replace(/[^A-Z0-9]+/gi,'_');
    },
    inputName: inputName,
    isChecked: function(val) {
      return val == this.value;
    },
    optionName: function() {
      return Options.findOne({ _id: this.option_id }).name
    },
    valueClass: function() {
      return (this.value || '').replace(/[^A-Z]+/gi, '-').replace(/(^\-|\-$)/gi,'').toLowerCase();
    }
  });

  Template.voteEdit.events({
    'change [type=radio]': function(e) {
      var form = e.target.form,
          checked = _.filter(document.getElementsByName(e.target.name), function(obj) { return !!obj.checked; }),
          val = checked[0] && checked[0].value;
      Votes.update({ _id: this._id }, { $set: { value: val } });
    }
  });
}
