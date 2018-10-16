/**
*
* LocationManager
*
*/

import React from 'react';
import {geolocated} from 'react-geolocated';

// import styled from 'styled-components';


class LocationManager extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.updateFunction = this.updateFunction.bind(this);
    this.interval = setInterval(this.updateFunction, 10000);
  }

  updateFunction() {
    // Quick fire once, then set interval to 90 seconds
    clearInterval(this.interval);
    this.interval = setInterval(this.updateFunction, 90000);

    if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled) {
      // Send coordinates to server
      this.props.sendCoordinates(this.props.coords);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <form className="navbar-form navbar-left">
        {!this.props.isGeolocationAvailable || !this.props.isGeolocationEnabled ?
         <button type="submit" className="btn btn-block btn-danger"><i className="fa fa-location-arrow"></i> GPS</button>
         :
         <button type="submit" className="btn btn-block btn-success"><i className="fa fa-location-arrow"></i> GPS</button>
        }
      </form>
    );
  }
}

LocationManager.propTypes = {

};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(LocationManager);
