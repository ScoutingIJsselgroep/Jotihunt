/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { createStructuredSelector } from 'reselect';
import withProgressBar from 'components/ProgressBar';
import '../../stylesheets/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import 'font-awesome/css/font-awesome.min.css';
import logo from './headonly.svg';

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
      <div>
        <Header location={this.props.location.pathname} sendCoordinates={this.sendCoordinates}/>
        <div>
          {React.Children.toArray(this.props.children)}
        </div>
      </div>
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
