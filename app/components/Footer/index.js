import React from 'react';

function Footer() {
  const scrollTop = () => {
    window.pageYOffset = 0;
  };
  return (
    <footer>
      <span className="pull-right">
        <a href="#/" onClick={scrollTop}>
          Naar boven&nbsp;
          <i className="fa fa-arrow-up" aria-hidden="true"></i>
        </a>
      </span>
      <span>© 2017 Scouting IJsselgroep.</span>
    </footer>
  );
}

export default Footer;
