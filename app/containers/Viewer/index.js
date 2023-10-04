import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { removeToken, loggedIn, loggedOut } from 'containers/Viewer/lib';
import { logout } from 'containers/Viewer/actions';
import { selectGivenName, selectPicture } from 'containers/Viewer/selectors';
import UserBadge from 'components/UserBadge';
import styles from './styles.css';

class ViewerWidget extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    givenName: React.PropTypes.string,
    picture: React.PropTypes.string,
    logout: React.PropTypes.func,
  };

  render() {
    const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  
    return (
      <div>
        {!isAuthenticated && <button className={`${styles.loginButton}`} onClick={() => loginWithRedirect()}>Log In</button>}
        {isAuthenticated && <div className={styles.dropDown}>
          <button className={styles.dropDownButton}>&#9660;</button>
          <div className={styles.dropDownContent}>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>

            <button className="btn btn-default" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Log Out
            </button>
          </div>
        </div>}
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
