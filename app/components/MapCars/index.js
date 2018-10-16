/**
*
* MapCars
*
*/

import React, { PropTypes } from 'react';
import CarMarker from '../CarMarker';
import _ from 'lodash';

function MapCars(cars, history) {
  return _.map(cars, (car, index) =>
    <CarMarker car={car} key={index} history={history} />);
}

MapCars.propTypes = {
  history: PropTypes.bool,
  cars: PropTypes.object,
};

export default MapCars;
