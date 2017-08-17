/**
*
* NavBarMenu
*
*/

import React from 'react';
import { removeToken, loggedIn, loggedOut } from 'containers/Viewer/lib';
import { createAndShow } from 'containers/Login/lib';

// import styled from 'styled-components';


class NavBarMenu extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    if (loggedIn()) {
      return (
        <span></span>
      );
    } else {
      return (
        <span></span>
      );
    }
  }
}

NavBarMenu.propTypes = {

};

export default NavBarMenu;
