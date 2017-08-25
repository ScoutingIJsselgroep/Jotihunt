/*
 *
 * MapContainer
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import makeSelectMapContainer from './selectors';

export class MapContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const GettingStartedGoogleMap = withGoogleMap(() => (
      <GoogleMap
        defaultZoom={9}
        defaultCenter={{ lat: 52.1523337615325, lng: 5.859883117643787 }}
      />));
    return (
      <div>
        <GettingStartedGoogleMap
          containerElement={
            <div style={{ height: '600px' }} />
          }
          mapElement={
            <div style={{ height: '600px' }} />
          }
        >
        </GettingStartedGoogleMap>
      </div>
    );
  }
}

MapContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  MapContainer: makeSelectMapContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
