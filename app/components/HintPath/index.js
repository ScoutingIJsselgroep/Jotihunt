/**
 *
 * HintPath
 *
 */

import React, { PropTypes } from 'react';
import { Circle, Polyline } from 'react-google-maps';
import _ from 'lodash';
import moment from 'moment';
import TailHintMarker from '../TailHintMarker';
import HintMarker from '../HintMarker';

const historyTime = require('../../../config').map.historyTime;

const walkingSpeed = require('../../../config').map.walkingSpeed;

function generateMarkerCircumference(hint) {
  const duration = moment.duration(moment(new Date()).diff(moment(hint.createdAt)));

  return (<Circle
    options={{
      fillColor: '#ffffff',
      fillOpacity: 0.1,
      strokeColor: '#ffffff',
      strokeOpacity: 1,
      strokeWeight: 2,
    }}
    defaultCenter={{ lat: hint.latitude, lng: hint.longitude }}
    defaultRadius={Math.min(duration.asMinutes() * ((walkingSpeed / 60) * 1000), 10000)}
  />);
}

function generatePath(path, color) {
  return <Polyline path={_.compact(path)} options={{ strokeColor: `#${color}` }} />;
}

function HintPath(hints, history) {
  const result = [];
  // Group Hints by Subarea
  const groupedHints = _.groupBy(hints, 'Subarea.name');

  // Sort Hints by date
  const sortedHints = _.map(groupedHints, (groupedHint) => _.sortBy(groupedHint, ['createdAt']));

  // Generate Markers for the init of every subarea
  result.push(_.map(sortedHints, (sortedHint) => _.map(_.initial(sortedHint), (hint, i) => <HintMarker hint={hint} key={i} history={history} />)));
  // Generate Marker for last entry of every subarea
  result.push(_.map(sortedHints, (sortedHint) => <TailHintMarker hint={_.last(sortedHint)} />));

  // Generate Marker Circumference
  result.push(_.map(sortedHints, (sortedHint) => generateMarkerCircumference(_.last(sortedHint))));

  // Generate paths
  result.push(_.map(sortedHints, (sortedHint) => generatePath(sortedHint.map((hint) => {
    const duration = moment.duration(moment(new Date()).diff(moment(hint.createdAt)));
    if (history || duration.asHours() < historyTime) {
      return ({ lat: hint.latitude, lng: hint.longitude });
    }
  }), _.head(sortedHint).Subarea.color)));

  return result;
}

HintPath.propTypes = {
  hints: PropTypes.array,
};

export default HintPath;
