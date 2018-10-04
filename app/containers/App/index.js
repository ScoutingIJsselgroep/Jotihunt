/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';

import Header from 'components/Header';
import Footer from 'components/Footer';
import withProgressBar from 'components/ProgressBar';
import '../../stylesheets/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import 'font-awesome/css/font-awesome.min.css';
import logo from './headonly.svg';

export function App(props) {
  return (
    <div>
      <Header location={props.location.pathname} />
      <div>
        {React.Children.toArray(props.children)}
      </div>
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default withProgressBar(App);
