/**
*
* ProjectionMapper
*
*/

import React, { PropTypes } from 'react';
// import styled from 'styled-components';

import { Marker, Polyline} from 'react-google-maps';
const icon = require('./Person.png');

function ProjectionMapper(predictions) {
  console.log(predictions);
  const markers = _.map(predictions, (prediction, i) =>
  <Marker key={i}
    icon={icon}
  position={{
    lat: (prediction[2].start_location.lat * (1-prediction[3]))
    + prediction[2].end_location.lat * (prediction[3]),
    lng: (prediction[2].start_location.lng * (1-prediction[3]))
    + prediction[2].end_location.lng * (prediction[3]) }}></Marker>);

  const currentPolyline = _.map(predictions, (prediction, j) =>
    <Polyline
      key={j + predictions.length}
      options={{ strokeColor: prediction[1].Subarea.color,  strokeWeight: 3}}
      path={google.maps.geometry.encoding.decodePath(prediction[2].polyline.points)}
    />);

  return markers.concat(currentPolyline);
}

ProjectionMapper.propTypes = {
  predictions: PropTypes.array,
};

export default ProjectionMapper;
