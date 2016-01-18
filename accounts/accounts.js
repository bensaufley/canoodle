if (Meteor.isClient) {
  Template.login.events({
    'submit #login': function(e) {
      e.preventDefault();
      var email = e.target.email.value,
          password = e.target.password.value;
      Meteor.loginWithPassword(email, password, function(err) {
        if (err) {
          // log error?
        } else {
          Session.set('displayMessages', [{ type: 'success', text: '<h4>Welcome</h4><p>Your have been successfully logged in.</p>' }]);
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
      Accounts.createUser({ email: email, password: password }, function(err) {
        if (err) {
          // log error?
        } else {
          var messages = Session.get('displayMessages') || [];
          messages.push({ type: 'success', text: '<h4>Welcome</h4><p>Your account has been successfully created.</p>' });
          Session.set('displayMessages', messages);
        }
      });
    }
  });
}
