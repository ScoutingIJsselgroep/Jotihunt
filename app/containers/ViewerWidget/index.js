import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { removeToken, loggedIn, loggedOut } from 'containers/Viewer/lib';
import { logout } from 'containers/Viewer/actions';
import { selectGivenName, selectPicture } from 'containers/Viewer/selectors';
import UserBadge from 'components/UserBadge';

class ViewerWidget extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    givenName: React.PropTypes.string,
    picture: React.PropTypes.string,
    logout: React.PropTypes.func,
  };

  render() {
    const {
      givenName,
      picture,
    } = this.props;

    return (
      <li>
        {picture && <UserBadge picture={picture} />}
        {givenName && <span>{givenName}</span>}
        {loggedOut() && <Link to="/login">
          Log In
        </Link>}
        {loggedIn() &&
            <Link to="/" onClick={this.props.logout}>
              Log Out
            </Link>}
      </li>
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
