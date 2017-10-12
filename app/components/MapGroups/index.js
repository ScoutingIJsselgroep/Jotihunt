/**
 *
 * MapGroups
 *
 */

import React from 'react';
import _ from 'lodash';
import { Marker } from 'react-google-maps';
import GroupMarker from '../GroupMarker/index';

const tj = require('@mapbox/togeojson');

// Import map
const kmlMapName = require('../../../config').map.filename;
const kml = require(`../../../maps/${kmlMapName}`);

function MapGroups() {
  const parsedKml = $.parseXML(kml);
  const geoJson = tj.kml(parsedKml, { styles: true });
  const result = _.map(geoJson.features, (feature, i) => {
    if (feature.geometry.type === 'Point') {
      return <GroupMarker point={feature} />;
    }
    return null;
  });
  return result;
}

MapGroups.propTypes = {

};

export default MapGroups;
