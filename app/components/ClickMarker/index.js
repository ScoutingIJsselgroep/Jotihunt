/**
*
* ClickMarker
*
*/

import React from 'react';
import { Marker } from 'react-google-maps';
// import styled from 'styled-components';


function ClickMarker({ latlng }) {
  return (<Marker
    position={{ lat: latlng[0], lng: latlng[1] }}
  >
  </Marker>);
}

ClickMarker.propTypes = {
  latlng: React.PropTypes.array,
};

export default ClickMarker;
