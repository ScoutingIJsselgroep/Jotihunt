/*
 *
 * MapViewer
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router'
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import Gpsbutton from 'components/Gpsbutton';

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
      </GoogleMap>));

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="btn-group">
            <button className="btn btn-default" onClick={browserHistory.goBack}>
              <i className="fa fa-arrow-left" aria-hidden="true"></i> Terug
            </button>
            <Gpsbutton latitude={this.props.params.latitude} longitude={this.props.params.longitude} />
          </div>
        </div>
        <div className="panel-body">
          <GettingStartedGoogleMap
            containerElement={
              <div style={{height: '400px'}}/>
            }
            mapElement={
              <div style={{height: '400px'}}/>
            }
          >

          </GettingStartedGoogleMap>
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
