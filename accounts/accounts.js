if (Meteor.isClient) {
  Template.login.events({
    'submit #login-form': function(e, t) {
      e.preventDefault();
      var email = t.email.value,
          password = t.password.value;
      Meteor.loginWithPassword(email, password, function(err) {
        if (err) {

        } else {

        }
      });
      return false;
    }
  });
}
