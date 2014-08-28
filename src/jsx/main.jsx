/** @jsx React.DOM */

var Main = React.createClass({
  // Store session state.
  getInitialState: function () {
    return {
      loggedIn: this.props.currentUser
    };
  },

  handleSessionChange: function () {
    if (this.state.loggedIn) {
      // Log user out and set logged out state.
      Parse.User.logOut();
      this.setState({ loggedIn: false });
    } else {
      // Log user in and set logged in state.
      Parse.FacebookUtils.logIn("publish_actions,email", {
        success: function(user) {          
          // If new user, get user info from facebook.
          if (!user.existed()) {
            this.createUser(user);
          }
        },
        error: function(user, error) {
          console.log('User cancelled the Facebook login or did not fully authorize.');
        }
      }).then(_.bind(function () {
        this.setState({ loggedIn: true });
      }, this));
    }
  },

  createUser: function (user) {
    var accessToken = user.attributes.authData.facebook.access_token,
        profile;

    $.ajax({
      url: "https://graph.facebook.com/v2.0/me",
      data: {
        access_token: accessToken
      },
      success: function (response) {
        // save facebook info to user object
        _.each(_.keys(response), function (userProp) {
          if (userProp != 'id') {
            user.set(userProp, response[userProp]);
          }
        })
        user.save();
      },
      error: function (response, errorText) {
        console.log(errorText);
      }
    });
  },

  render: function () {
    return (
      <div className="wrapper">
        <FacebookButton loggedIn={this.state.loggedIn} onSessionChange={this.handleSessionChange} />
      </div>
    );
  }
});

React.renderComponent(<Main currentUser={Parse.User.current()} />, $('#main')[0]);
