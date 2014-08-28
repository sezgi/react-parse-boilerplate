/** @jsx React.DOM */

var FacebookButton = React.createClass({
  
  handleClick: function (e) {
    // Call session change on button click.
    this.props.onSessionChange();
  },

  render: function () {
    var button = this.props.loggedIn ? 
      <a className="logout-link" href="javascript://" onClick={this.handleClick}>Log out</a> :
      <a className="login-button button-link" href="javascript://" onClick={this.handleClick}>Log in with Facebook</a>;
    return (
      <div>{button}</div>
    );
  }
});
