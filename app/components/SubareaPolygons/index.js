/**
 *
 * SubareaPolygons
 *
 */

import React from 'react';
import { Polygon } from 'react-google-maps';

const tj = require('@mapbox/togeojson');

// import styled from 'styled-components';
const kmlMapName = require('../../../config').map.filename;
const kml = require(`../../../maps/${kmlMapName}`);

function getCoordinates(coordinates) {
  return coordinates.map((coordinate) => new google.maps.LatLng(coordinate[1], coordinate[0]));
}

function SubareaPolygons() {
  const parsedKml = $.parseXML(kml);
  const geoJson = tj.kml(parsedKml, { styles: true });

  const result = [];
  for (const i in geoJson.features) {
    if (geoJson.features[i].geometry.type === 'Polygon') {
      const properties = geoJson.features[i].properties;
      const options = {
        fillColor: properties.fill,
        fillOpacity: properties['fill-opacity'] * 0.2,
        strokeColor: properties.stroke,
        strokeOpacity: properties['stroke-opacity'],
        strokeWeight: 2,
      };
      result.push(<Polygon key={i} path={getCoordinates(geoJson.features[i].geometry.coordinates[0])} options={options} />);
    }
  }
  return result;
}

SubareaPolygons.propTypes = {};

export default SubareaPolygons;
