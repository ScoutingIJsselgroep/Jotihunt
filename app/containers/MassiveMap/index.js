/*
 *
 * MassiveMap
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';
import StatusBar from 'components/StatusBar';
import { createStructuredSelector } from 'reselect';
import makeSelectMassiveMap, { loadingStatusSelector, errorStatusSelector, statusSelector, loadingSelector, errorSelector, hintsSelector } from './selectors';
import { loadHints, loadStatus } from './actions';

export class MassiveMap extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    // Go load hints
    const { dispatch } = this.props;
    dispatch(loadHints());
    dispatch(loadStatus());
  }

  render() {
    const MyMapComponent = withGoogleMap((props) =>
      <GoogleMap
        defaultZoom={9}
        defaultCenter={{ lat: 52.1523337615325, lng: 5.859883117643787 }}
      >
        {this.props.hints && this.props.hints.map((hint, i) =>
          <Marker key={i} position={{ lat: hint.latitude, lng: hint.longitude }} />
        )}
      </GoogleMap>
    );

    return (
      <div>
        <StatusBar loading={this.props.loadingStatus} error={this.props.errorStatus} status={this.props.status} />
        <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '600px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    );
  }
}

MassiveMap.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  hints: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  loadingStatus: PropTypes.bool,
  errorStatus: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  status: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
};

const mapStateToProps = createStructuredSelector({
  MassiveMap: makeSelectMassiveMap(),
  loading: loadingSelector(),
  hints: hintsSelector(),
  error: errorSelector(),
  errorStatus: errorStatusSelector(),
  loadingStatus: loadingStatusSelector(),
  status: statusSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MassiveMap);