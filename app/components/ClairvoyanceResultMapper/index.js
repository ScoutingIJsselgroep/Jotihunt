/**
 *
 * ClairvoyanceResultMapper
 *
 */

import React, { PropTypes } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import _ from 'lodash';
import MapGroups from '../../components/MapGroups';
import newId from '../../utils/newid';
import deviation from '../../utils/deviation';

import SubareaPolygons from '../../components/SubareaPolygons/index';

const config = require('../../../config');

// import styled from 'styled-components';


class ClairvoyanceResultMapper extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.id = newId();
  }

  onRightClick(event) {
  }

  render() {
    const GettingStartedGoogleMap = withGoogleMap(() => (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 52.1023337615325, lng: 6.009883117643787 }}
        onRightClick={this.onRightClick}
      >
        {MapGroups().map((group) => group)}
        {SubareaPolygons(this.onRightClick).map((subarea) => subarea)}
        {_.map(this.props.result.wgs, (result, i) => <Marker
          key={i}
          position={new google.maps.LatLng(result[0], result[1])}
        />)}
      </GoogleMap>));

    return (
      <div className="panel panel-default">
        <table className="table">
          <tbody>
            {_.map(this.props.result.rd, (result, i) => <tr key={i}>
              <td>{config.dbMappings.nArea[i]}</td>
              <td>{result[0]}</td>
              <td>{result[1]}</td>
              <td>{this.props.result.cost[i].toFixed(1)} km</td>
            </tr>)}
          </tbody>
        </table>
        <a className="btn btn-primary" role="button" data-toggle="collapse" href={`#${this.id}`} aria-expanded="false" aria-controls="collapseExample">
          Toon details
        </a>

        <div className="collapse" id={this.id}>
          <GettingStartedGoogleMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${config.google.googleAppId}v=3.exp&libraries=geometry,drawing,places`}
            containerElement={
              <div style={{ height: '400px' }} />
            }
            mapElement={
              <div style={{ height: '400px' }} />
            }
          >
          </GettingStartedGoogleMap>
        </div>
        {// TODO: Add map dropdown
        }
        <div className="panel-body">
          Klopt het resultaat? Verstuur het dan in één keer!
          <button onClick={() => this.props.onSubmitValuesAsHint(this.props.result.rd)} className="btn btn-default pull-right">Versturen</button>
        </div>
      </div>
    );
  }
}

ClairvoyanceResultMapper.propTypes = {
  result: PropTypes.object,
  onSubmitValuesAsHint: PropTypes.func,
};

export default ClairvoyanceResultMapper;
