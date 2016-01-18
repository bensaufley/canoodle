if (Meteor.isClient) {
  Template.login.events({
    'submit #login': function(e) {
      e.preventDefault();
      var email = e.target.email.value,
          password = e.target.password.value;
      Meteor.loginWithPassword(email, password, function(err) {
        if (err) {

        } else {

        }
      });
      return false;
    }
  });

  Template.register.events({
    'submit #register': function(e) {
      e.preventDefault();
      var email = e.target.email.value.trim(),
          password = e.target.password.value;
      debugger;
    }
  });
}
