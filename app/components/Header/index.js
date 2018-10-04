/**
*
* CarMarker
*
*/

import React, { PropTypes } from 'react';
import NavbarLogin from 'components/NavbarLogin';
import NavBarMenu from 'components/NavBarMenu';

import Img from './Img';
import NavBar from './NavBar';
import logo from './headonly.svg';
let toggle = false;

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onHeaderToggle = this.onHeaderToggle.bind(this);
  }

  onHeaderToggle() {
    toggle = !toggle;
    this.forceUpdate();
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <NavBar className="navbar-brand" href="#">
              <span><Img alt="" src={logo} /></span>&nbsp;Jotihunt.js
            </NavBar>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <NavBarMenu />
            <NavbarLogin />
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  location: PropTypes.string.isRequired,
  toggle: PropTypes.bool,
};

export default Header;
