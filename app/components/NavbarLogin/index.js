/**
*
* NavbarLogin
*
*/

import React from 'react';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { removeToken, loggedIn, loggedOut } from 'containers/Viewer/lib';
import { createAndShow } from 'containers/Login/lib';
import { logout } from 'containers/Viewer/actions';


class NavbarLogin extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    if (!this.props.loggedIn) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li className="pull-right"><a onClick={this.props.login} >Login <i className="fa fa-lock"/></a></li>
        </ul>
      );
    } else {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li className="pull-right"><a onClick={this.props.logout}>Logout <i className="fa fa-lock"/></a></li>
        </ul>
      );
    }
  }
}

const mapStateToProps = createStructuredSelector({
  loggedIn: loggedIn
});

function mapDispatchToProps(dispatch) {
  return {
    logout() {
      removeToken();
      dispatch(logout());
    },
    login() {
      createAndShow('/');
    }
  };
}

NavbarLogin.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarLogin);
