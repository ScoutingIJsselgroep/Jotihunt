/**
*
* MapDetailView
*
*/

import React from 'react';
// import styled from 'styled-components';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';

function MapDetailView({ lat, lng }) {
  const MyMapComponent = withGoogleMap(() =>
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat, lng }}
    >

      <Marker position={{ lat, lng }} />
    </GoogleMap>
  );

  return (
    <MyMapComponent
      isMarkerShown
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '300px' }} />}
      mapElement={<div style={{ height: '100%' }} />}
    />
  );
}

MapDetailView.propTypes = {
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
};

export default MapDetailView;
