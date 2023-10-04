/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';

import { connect } from 'react-redux';
import Header from 'components/Header';
import { Auth0Provider } from '@auth0/auth0-react';
import { createStructuredSelector } from 'reselect';
import withProgressBar from 'components/ProgressBar';
import '../../stylesheets/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import 'font-awesome/css/font-awesome.min.css';

import { doSendCoordinates } from './actions';

export class App extends React.Component  {
  constructor(props) {
    super(props);
    this.sendCoordinates = this.sendCoordinates.bind(this);
  }

  sendCoordinates(coords) {
    const { dispatch } = this.props;
    dispatch(doSendCoordinates(coords));
  }

  render() {
    return (
      <Auth0Provider
        domain={process.env.AUTH0_DOMAIN}
        clientId={process.env.AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: process.env.AUTH0_AUDIENCE,
        }}
      >
        <div>
          <Header location={this.props.location.pathname} sendCoordinates={this.sendCoordinates}/>
          <div>
            {React.Children.toArray(this.props.children)}
          </div>
        </div>
      </Auth0Provider>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
});

App.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withProgressBar(App));
