/**
*
* MapCars
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import CarMarker from '../CarMarker';
import _ from 'lodash';

function MapCars(cars, history, onInfoWindow) {
  return _.map(cars, (car, index) =>
    <CarMarker car={car} key={index} history={history} onInfoWindow={onInfoWindow} />);
}

MapCars.propTypes = {
  history: PropTypes.bool,
  cars: PropTypes.object,
  onInfoWindow: PropTypes.func,
};

export default MapCars;
