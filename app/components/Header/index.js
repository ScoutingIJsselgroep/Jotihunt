import React from 'react';
import {FormattedMessage} from 'react-intl';
import NavbarLogin from 'components/NavbarLogin';
import NavBarMenu from 'components/NavBarMenu';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';
import logo from './logo_64.png';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    location: React.PropTypes.string.isRequired,
  };

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <NavBar className="navbar-brand" href="#">
              <span><Img alt=" " src={logo}/></span>&nbsp;Jotihunt.js
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

export default Header;
