/**
*
* MapCars
*
*/

import React, { PropTypes } from 'react';
import CarMarker from '../CarMarker';
import _ from 'lodash';

function MapCars(cars, history) {
  return _.map(cars, (car) =>
    <CarMarker car={car} history={history} />);
}

MapCars.propTypes = {
  history: PropTypes.bool,
  cars: PropTypes.object,
};

export default MapCars;
