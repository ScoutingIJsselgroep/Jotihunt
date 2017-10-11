/**
*
* CarMarker
*
*/

import React, { PropTypes } from 'react';
import { InfoWindow, Marker } from 'react-google-maps';
import moment from 'moment';

const carIcon = require('./car.png');
let isOpen = false;

class CarMarker extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onToggleOpen = this.onToggleOpen.bind(this);
  }

  onToggleOpen() {
    isOpen = !isOpen;
    this.forceUpdate();
  }

  render() {
    moment.locale('nl');
    return (
      <Marker
        icon={carIcon} position={{ lat: this.props.car.latitude, lng: this.props.car.longitude }} onClick={this.onToggleOpen}
      >
        {isOpen && <InfoWindow onCloseClick={this.onToggleOpen}>
          <div>
            {this.props.car.name} {moment(this.props.car.updatedAt).calendar()}
          </div>
        </InfoWindow>}
      </Marker>
    );
  }
}

CarMarker.propTypes = {
  car: PropTypes.object,
};

export default CarMarker;
