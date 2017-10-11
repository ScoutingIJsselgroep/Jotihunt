/**
 *
 * HintPath
 *
 */

import React, { PropTypes } from 'react';
import { Marker, Polyline } from 'react-google-maps';
import _ from 'lodash';
import moment from 'moment';

const historyTime = require('../../../config').map.historyTime;

/**
 * Generate a marker for the Hint.
 * @param hint The hint to generate a marker for
 */
function generateMarker(hint) {
  return <Marker position={{ lat: hint.latitude, lng: hint.longitude }} />;
}

function generatePath(path) {
  return <Polyline path={_.compact(path)} />;
}

function HintPath(hints, history) {
  const result = [];
  // Group Hints by Subarea
  const groupedHints = _.groupBy(hints, 'Subarea.name');

  // Sort Hints by date
  const sortedHints = _.map(groupedHints, (groupedHint) => _.sortBy(groupedHint, ['createdAt']));

  // Generate Marker for last entry of every subarea
  result.push(_.map(sortedHints, (sortedHint) => generateMarker(_.last(sortedHint))));

  // Generate paths
  result.push(_.map(sortedHints, (sortedHint) => generatePath(sortedHint.map((hint) => {
    const duration = moment.duration(moment(new Date()).diff(moment(hint.createdAt)));
    if (history || duration.asHours() < historyTime) {
      return ({ lat: hint.latitude, lng: hint.longitude });
    }
  }))));

  return result;
}

HintPath.propTypes = {
  hints: PropTypes.array,
};

export default HintPath;
