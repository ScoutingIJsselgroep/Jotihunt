/**
*
* GroupMarker
*
*/

import React, { PropTypes } from 'react';
import { InfoWindow, Marker } from 'react-google-maps';
// import styled from 'styled-components';

const groupIcon = require('./group.png');

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
    return (
      <Marker icon={groupIcon} position={coordinates} onClick={this.onToggleOpen}>
        {this.props.point.isOpen && <InfoWindow onCloseClick={this.onToggleOpen}>
          <div>
            <b>{this.props.point.properties.name}</b>
            <span dangerouslySetInnerHTML={{ __html: this.props.point.properties.description }} />
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
