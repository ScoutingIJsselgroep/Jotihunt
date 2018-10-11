/**
*
* GroupMarker
*
*/

import React, { PropTypes } from 'react';
import { InfoWindow, Marker } from 'react-google-maps';
import Gpsbutton from '../Gpsbutton/index';
// import styled from 'styled-components';

const groupIcon = require('./group-pm.png');
const organisationIcon = require('./organisation.png');

function getCoordinates(coordinates) {
  return { lat: coordinates[1], lng: coordinates[0] };
}

class GroupMarker extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onToggleOpen = this.onToggleOpen.bind(this);
  }

  onToggleOpen() {
    this.props.point.isOpen = !this.props.point.isOpen;
    this.forceUpdate();
  }

  render() {
    const coordinates = getCoordinates(this.props.point.geometry.coordinates);
    if (this.props.point.properties.name === 'Jotihunt Organisatie') {
      return (<Marker icon={organisationIcon} position={coordinates} onClick={this.onToggleOpen}>
        {this.props.point.isOpen && <InfoWindow onCloseClick={this.onToggleOpen}>
          <div>
            <b>{this.props.point.properties.name}</b>
            <span dangerouslySetInnerHTML={{ __html: this.props.point.properties.description }} />
            <Gpsbutton latitude={this.props.point.geometry.coordinates[1]} longitude={this.props.point.geometry.coordinates[0]} />
          </div>
        </InfoWindow>}
      </Marker>);
    }
    return (
      <Marker icon={groupIcon} position={coordinates} onClick={this.onToggleOpen}>
        {this.props.point.isOpen && <InfoWindow onCloseClick={this.onToggleOpen}>
          <div>
            <b>{this.props.point.properties.name}</b>
            <span dangerouslySetInnerHTML={{ __html: this.props.point.properties.description }} /><br />
            <Gpsbutton latitude={this.props.point.geometry.coordinates[1]} longitude={this.props.point.geometry.coordinates[0]} />
          </div>
        </InfoWindow>}
      </Marker>
    );
  }
}

GroupMarker.propTypes = {
  point: PropTypes.object,
};

export default GroupMarker;
