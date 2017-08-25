/*
 *
 * MapViewer
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';


export class MapViewer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const GettingStartedGoogleMap = withGoogleMap(() => (
      <GoogleMap
        defaultZoom={9}
        defaultCenter={{ lat: 52.1523337615325, lng: 5.859883117643787 }}
      />));
    console.log(this.props.params.latitude);
    console.log(this.props.params.longitude);
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
        <button className="btn btn-default" onClick={browserHistory.goBack}>Back</button> Locatie op kaart
        </div>
        <div className="panel-body">
          <GettingStartedGoogleMap
            containerElement={
              <div style={{ height: '400px' }} />
            }
            mapElement={
              <div style={{ height: '400px' }} />
            }
          >
            <Marker
              position={{
                lat: this.props.params.latitude,
                lng: this.props.params.longitude
              }}
            />
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
