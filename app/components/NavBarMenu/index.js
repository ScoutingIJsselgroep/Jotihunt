/**
*
* NavBarMenu
*
*/

import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router';

// import styled from 'styled-components';


class NavBarMenu extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { isAuthenticated } = useAuth0();
    
    if (isAuthenticated) {
      // When logged in
      return (
        <ul className="nav navbar-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/hint/add">Hint toevoegen</Link></li>
          <li><Link to="/hint/list">Hints <i className="fa fa-list" aria-hidden="true"></i> </Link></li>
          <li><Link to="/group/list">Groepen <i className="fa fa-list" aria-hidden="true"></i> </Link></li>
          <li><Link to="/map">Kaart <i className="fa fa-map" aria-hidden="true"></i> </Link></li>
          <li><Link to="/messages">Berichten</Link></li>
        </ul>
      );
    }
    // When not logged in
    return (
      <ul className="nav navbar-nav">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">Over</Link></li>
      </ul>
    );
  }
}

NavBarMenu.propTypes = {

};

export default NavBarMenu;
