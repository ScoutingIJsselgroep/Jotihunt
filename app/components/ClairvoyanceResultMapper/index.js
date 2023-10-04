/**
 *
 * ClairvoyanceResultMapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import _ from 'lodash';
import newId from '../../utils/newid';
import HintPath from '../../components/HintPath/index';
import deviation from '../../utils/deviation';

import SubareaPolygons from '../../components/SubareaPolygons/index';

const config = require('../../../config');

// import styled from 'styled-components';

class ClairvoyanceResultMapper extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.id = newId();
  }

  onRightClick(event) {
  }

  render() {
    const GettingStartedGoogleMap = withGoogleMap(() => (
      <GoogleMap
        defaultZoom={9}
        defaultCenter={{ lat: 52.1023337615325, lng: 6.009883117643787 }}
        onRightClick={this.onRightClick}
      >
        {this.props.hints && HintPath(this.props.hints, this.props.history, this.onRightClick)}
        {SubareaPolygons(this.onRightClick).map((subarea) => subarea)}
        {_.map(this.props.result.wgs, (result, i) => <Marker
          key={i}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
          }}
          position={new google.maps.LatLng(result[0], result[1])}
        />)}
      </GoogleMap>));

    return (
      <div className="panel panel-default">
        <table className="table">
          <tbody>
            <tr className="info">
              <td> Totaal </td>
              <td> μ = {_.mean(this.props.result.cost).toFixed(1)} </td>
              <td> [{_.min(this.props.result.cost).toFixed(1)}, {_.max(this.props.result.cost).toFixed(1)}] </td>
              <td> Σ = {this.props.result.totalCost.toFixed(1)} km </td>
            </tr>
          </tbody>
        </table>


        <div className="collapse" id={this.id}>
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
        </div>

        <GettingStartedGoogleMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${config.google.googleClientAuthToken}v=3.exp&libraries=geometry,drawing,places`}
          containerElement={
            <div style={{ height: '400px' }} />
          }
          mapElement={
            <div style={{ height: '400px' }} />
          }
        >
        </GettingStartedGoogleMap>
        <div className="panel-body">
          <img src={'https://maps.google.com/mapfiles/ms/icons/green-dot.png'} /> Huidige oplossing
          <div className="btn-group pull-right">
            <button className="btn btn-default" role="button" data-toggle="collapse" href={`#${this.id}`} aria-expanded="false" aria-controls="Toon details">
              <span className="fa fa-chevron-down" />&nbsp;Details
            </button>
            <button onClick={() => this.props.onSubmitValuesAsHint(this.props.result.rd)} className="btn btn-primary">
              <span className={'fa fa-check'} />&nbsp;Versturen
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ClairvoyanceResultMapper.propTypes = {
  result: PropTypes.object,
  onSubmitValuesAsHint: PropTypes.func,
  hints: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
};

export default ClairvoyanceResultMapper;
