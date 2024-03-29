/**
*
* AddHintMap
*
*/

import React from 'react';
import PropTypes from 'prop-types';

// import styled from 'styled-components';
import { GoogleMap, Marker, withGoogleMap, InfoWindow } from 'react-google-maps';
// import SubareaPolygons from '../SubareaPolygons/index';
import MapGroups from '../../components/MapGroups';

const config = require('./../../../config');

function AddHintMap({ wgs, address }) {
  const MyMapComponent = withGoogleMap(() =>
    <GoogleMap
      defaultZoom={9}
      defaultCenter={{ lat: 52.1523337615325, lng: 5.859883117643787 }}
    >
      <MapGroups onRightClick={() => {return console.log('right click not supported')}} onInfoWindow={() => {}} />
      { wgs ?
        <Marker position={{ lat: wgs[0], lng: wgs[1] }} >
          <InfoWindow>
            <div>
              {address && address[0] && address[0].formatted_address}
            </div>
          </InfoWindow>
        </Marker>
        :
        <InfoWindow position={{ lat: 52.1523337615325, lng: 5.859883117643787 }}>
          <div>
            Vul eerst coördinaten in.
          </div>
        </InfoWindow>
      }
    </GoogleMap>
  );

  return (
    <MyMapComponent
      isMarkerShown
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${config.google.googleClientAuthToken}v=3.exp&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '300px' }} />}
      mapElement={<div style={{ height: '100%' }} />}
    />
  );
}

AddHintMap.propTypes = {
  wgs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.number)]),
  address: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
};

export default AddHintMap;
