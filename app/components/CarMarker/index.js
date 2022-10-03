/**
*
* CarMarker
*
*/

import React, { PropTypes } from 'react';
import { InfoWindow, Marker } from 'react-google-maps';
import moment from 'moment';

const historyTime = require('../../../config').map.historyTime;

const carOnlineIcon = require('./car-marker.png');

class CarMarker extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onToggleOpen = this.onToggleOpen.bind(this);
  }

  onToggleOpen() {
    this.props.car.isOpen = !this.props.car.isOpen;
    this.forceUpdate();
  }

  render() {
    moment.locale('nl');
    const duration = moment.duration(moment(new Date()).diff(moment(this.props.car.updatedAt)));

    if (this.props.history || (duration.asHours() < historyTime && duration.asMinutes() < 20)) {
      return (
        <Marker
          icon={carOnlineIcon}
          position={{ lat: this.props.car.latitude, lng: this.props.car.longitude }} onClick={this.onToggleOpen}
        >
          {this.props.car.isOpen && <InfoWindow onCloseClick={this.onToggleOpen}>
            <div>
              <b>{this.props.car.name}</b> <br/> {moment(this.props.car.updatedAt).calendar()} <br />
              <span className="fa fa-tachometer"></span> {this.props.car.speed && this.props.car.speed > 0 ? 
                 this.props.car.speed + ' km/h' : 'onbekend'
              }
            </div>
          </InfoWindow>}
        </Marker>
      );
    }
    return null;
  }
}

CarMarker.propTypes = {
  car: PropTypes.object,
  history: PropTypes.bool,
};

export default CarMarker;
