import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { removeToken, loggedIn, loggedOut } from 'containers/Viewer/lib';
import { logout } from 'containers/Viewer/actions';
import { selectGivenName, selectPicture } from 'containers/Viewer/selectors';

class ViewerWidget extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    logout: React.PropTypes.func,
  };

  render() {
    return (
      <div className="navbar-form">
        {loggedOut() && <Link to="/login" className="btn btn-success">
          Log In <i className="fa fa-sign-in" aria-hidden="true"></i>
        </Link>}
        {loggedIn() &&
          <Link to="/" onClick={this.props.logout} className="btn btn-default">
            Log Out <i className="fa fa-sign-out" aria-hidden="true"></i>
          </Link>}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  givenName: selectGivenName(),
  picture: selectPicture(),
});

function mapDispatchToProps(dispatch) {
  return {
    logout() {
      removeToken();
      dispatch(logout());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewerWidget);
