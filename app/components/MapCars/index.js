/**
*
* MapCars
*
*/

import React from 'react';
import CarMarker from '../CarMarker';
import { Marker, InfoWindow } from 'react-google-maps';

// import styled from 'styled-components';

const carIcon = require('./car.png');


function MapCars(cars, props) {
  const result = [];

  console.log(props);

  for (const i in cars) {
    const car = cars[i];
    result.push(<CarMarker car={car} />);
  }
  return result;
}

MapCars.propTypes = {

};

export default MapCars;
