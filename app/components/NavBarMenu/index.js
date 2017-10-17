/**
*
* NavBarMenu
*
*/

import React from 'react';
import { removeToken, loggedIn, loggedOut } from 'containers/Viewer/lib';
import { createAndShow } from 'containers/Login/lib';
import { Link } from 'react-router';

// import styled from 'styled-components';


class NavBarMenu extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    if (loggedIn()) {
      // When logged in
      return (
        <ul className="nav navbar-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/hint/add">Hint toevoegen</Link></li>
          <li><Link to="/hint/list">Hints <i className="fa fa-list" aria-hidden="true"></i> </Link></li>
          {/*
          <li><Link to="/group/list">Groepen <i className="fa fa-list" aria-hidden="true"></i> </Link></li>
          */}
          <li><Link to="/map">Kaart <i className="fa fa-map" aria-hidden="true"></i> </Link></li>
          <li><Link to="/clairvoyance">Clairvoyance <i className="fa fa-eye" aria-hidden="true"></i> </Link></li>
          <li className="dropdown">
            <Link href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Overig <span className="caret"></span></Link>
            <ul className="dropdown-menu toggle">
              <li><Link to="https://goo.gl/forms/wwGXbeGQCaVsYhRx2" target={'_blank'}><i className="fa fa-bullhorn" aria-hidden="true"></i> Klaagmuur</Link></li>
              <li><Link to="/wiki"><i className="fa fa-wikipedia-w" aria-hidden="true"></i> Wiki de Viking</Link></li>
              <li><Link to="https://raw.githubusercontent.com/ScoutingIJsselgroep/JotihuntWiki/master/app.apk"><i className="fa fa-android" aria-hidden="true"></i> App</Link></li>
            </ul>
          </li>
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
