/**
*
* ProjectionMapper
*
*/

import React, { PropTypes } from 'react';
// import styled from 'styled-components';

import { Marker, Polyline} from 'react-google-maps';


function ProjectionMapper(predictions) {
  const markers = _.map(predictions, (prediction) =>
  <Marker position={{
    lat: (prediction[2].start_location.lat * (1-prediction[3]))
    + prediction[2].end_location.lat * (prediction[3]),
    lng: (prediction[2].start_location.lng * (1-prediction[3]))
    + prediction[2].end_location.lng * (prediction[3]) }}></Marker>);

  const polylines = _.map(predictions, (prediction) =>
    <Polyline
      path={google.maps.geometry.encoding.decodePath(prediction[2].polyline.points)}
      options={{ strokeColor: prediction[1].Subarea.color }}
    />);

  return markers.concat(polylines);
}

ProjectionMapper.propTypes = {
  predictions: PropTypes.array,
};

export default ProjectionMapper;
