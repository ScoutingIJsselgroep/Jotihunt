import React from 'react';
import logo from './logo_256.png';

import FooterLogo from './FooterLogo';

function Footer() {
  const scrollTop = () => {
    window.pageYOffset = 0;
  };
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-sm-5">
            <h3 className="lead"><strong>Information</strong> and <strong>Copyright</strong></h3>
            <div>Powered by <a href="https://facebook.github.io/react/"><strong>React</strong></a>, <a href="http://redux.js.org/"><strong>Redux</strong></a> and a whole bunch of other <abbr title="magic"><i className="fa fa-magic" /></abbr>.</div>
            <div>© 2017 Tristan de Boer, licensed under MIT License.</div>
          </div>
          <div className="col-sm-2 footerimage text-center">
            <FooterLogo src={logo} />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
