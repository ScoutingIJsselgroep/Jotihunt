import React from 'react';
import { FormattedMessage } from 'react-intl';
import ViewerWidget from 'containers/ViewerWidget';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    location: React.PropTypes.string.isRequired,
  };
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
            <a className="navbar-brand" href="#">Jotihunt.js</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Kaart <i className="fa fa-map"/></a></li>
              <li><a href="#">Hint toevoegen <span className="sr-only">(current)</span></a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <ViewerWidget />
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
