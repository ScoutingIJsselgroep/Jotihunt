/*
 *
 * MapViewer
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import Gpsbutton from 'components/Gpsbutton';
import MapGroups from '../../components/MapGroups';

const config = require('./../../../config');

export class MapViewer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const GettingStartedGoogleMap = withGoogleMap(() => (
      <GoogleMap
        defaultZoom={9}
        defaultCenter={new google.maps.LatLng(this.props.params.latitude, this.props.params.longitude)}
      >

        <Marker
          position={new google.maps.LatLng(this.props.params.latitude, this.props.params.longitude)}
        />
        <MapGroups showGroups={this.props.params.groups ? true : false}/>
      </GoogleMap>));
    const onRightClick = () => {};

    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="btn-group">
              <button className="btn btn-default" onClick={browserHistory.goBack}>
                <i className="fa fa-arrow-left" aria-hidden="true"></i> Terug
              </button>
              <Gpsbutton latitude={parseFloat(this.props.params.latitude)} longitude={parseFloat(this.props.params.longitude)} />
            </div>
          </div>
          <div className="panel-body">
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
          </div>
        </div>
      </div>
    );
  }
}

MapViewer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(MapViewer);
