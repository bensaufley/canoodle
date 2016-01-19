function getVotes() {
  return Votes.find({ voteset_id: this._id }, { sort: { voteset_id: 1 } });
}

function currentUserClass() {
  return Meteor.userId() == this.createdBy != null ? 'mine' : '';
}

if (Meteor.isClient) {
  Template.votesetShow.helpers({
    currentUserClass: currentUserClass,
    votes: getVotes
  });
  Template.votesetEdit.helpers({
    currentUserClass: currentUserClass,
    votes: getVotes
  });

  Template.votesetEdit.events({
    'change input, input input': function(e) {
      var form = e.target.form;
      if (form.name.value) {
        var params = { $set: {} };
        params.$set[e.target.name] = e.target.value;
        VoteSets.update({ _id: this._id }, params);
      }
    },
    'submit .voteset': function(e) {
      e.preventDefault();
      debugger;
    }
  });
}
