/**
*
* MapCircle
*
*/

import React from 'react';
import { Circle } from 'react-google-maps';
// import styled from 'styled-components';

const config = require('../../../config').map.homebaseCircle;

function MapCircle() {
  return (<Circle
    options={{
      fillColor: '#d43f3a',
      fillOpacity: 0.1,
      strokeColor: '#d43f3a',
      strokeOpacity: 1,
      strokeWeight: 2,
    }}
    defaultCenter={{ lat: config.latitude, lng: config.longitude }}
    defaultRadius={500}
  />);
}

MapCircle.propTypes = {

};

export default MapCircle;
