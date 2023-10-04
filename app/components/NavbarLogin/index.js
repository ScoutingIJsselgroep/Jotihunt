/**
*
* NavbarLogin
*
*/

import React from 'react';


class NavbarLogin extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  
    if (!isAuthenticated) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li className="pull-right"><a onClick={() => loginWithRedirect()}>Login <i className="fa fa-lock" /></a></li>
        </ul>
      );
    }
    return (
      <ul className="nav navbar-nav navbar-right">
        <li className="pull-right"><a onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout <i className="fa fa-lock" /></a></li>
      </ul>
    );
  }
}

export default NavbarLogin;
