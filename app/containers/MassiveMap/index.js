/*
 *
 * MassiveMap
 *
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { GoogleMap, withGoogleMap } from 'react-google-maps';
import Toggle from 'react-bootstrap-toggle';
import StatusBar from 'components/StatusBar';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import makeSelectMassiveMap, {
  carsErrorSelector,
  carsLoadingSelector,
  carsSelector,
  errorSelector,
  errorStatusSelector,
  hintsSelector,
  historySelector,
  loadingSelector,
  loadingStatusSelector, loadRightClickLocationSelector,
  loadRightClickSelector,
  rightClickLatLngSelector,
  statusSelector,
} from './selectors';
import { historyToggle, loadCars, loadHints, loadStatus, rightClickEvent } from './actions';
import SubareaPolygons from '../../components/SubareaPolygons/index';
import MapGroups from '../../components/MapGroups';
import MapCars from '../../components/MapCars/index';
import HintPath from '../../components/HintPath/index';
import MapCircle from '../../components/MapCircle';
import '../../../node_modules/react-bootstrap-toggle/dist/bootstrap2-toggle.css';
import LoadingIndicator from '../../components/LoadingIndicator/index';

const historyTime = require('../../../config').map.historyTime;


export class MassiveMap extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.reloadAll = this.reloadAll.bind(this);
    this.onHistoryToggle = this.onHistoryToggle.bind(this);
    this.onRightClick = this.onRightClick.bind(this);
  }

  componentDidMount() {
    // Go load hints
    const { dispatch } = this.props;
    dispatch(loadHints());
    dispatch(loadStatus());
    dispatch(loadCars());
  }

  onHistoryToggle(history) {
    const { dispatch } = this.props;
    dispatch(historyToggle(!history));
  }

  onRightClick(event) {
    const { dispatch } = this.props;
    dispatch(rightClickEvent([event.latLng.lat(), event.latLng.lng()]));
  }

  reloadAll() {
    const { dispatch } = this.props;
    dispatch(loadHints());
    dispatch(loadStatus());
    dispatch(loadCars());
  }

  render() {
    let huntCount = 0;
    if (this.props.hints) {
      huntCount = _.filter(this.props.hints, (hint) => hint.HintType.name === 'Hunt').length;
    }

    const MyMapComponent = withGoogleMap((props) =>
      <GoogleMap
        defaultZoom={9}
        defaultCenter={{ lat: 52.1523337615325, lng: 5.859883117643787 }}
        onRightClick={this.onRightClick}
      >
        {SubareaPolygons(this.onRightClick).map((subarea) => subarea)}
        {MapGroups().map((group) => group)}
        <MapCircle />
        {this.props.hints && HintPath(this.props.hints, this.props.history)}
        {this.props.cars && MapCars(this.props.cars, this.props.history).map((car) => car)}

      </GoogleMap>
    );

    return (
      <div>
        <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '600px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
        {(this.props.loadRightClick || this.props.rightClickLatLng) &&
        <div className="panel panel-default">
          <div className="panel-heading"><i className="fa fa-map-marker" aria-hidden="true"></i> Geselecteerde locatie</div>
          <div className="panel-body">
            {this.props.loadRightClick && <LoadingIndicator />}
            {this.props.clickLocationInfo && <div>
              <span className="label label-default">{this.props.clickLocationInfo.subarea}</span> {this.props.clickLocationInfo.address.results[0] ? this.props.clickLocationInfo.address.results[0].formatted_address : 'Onbekende weg'}
              <div className="btn-group pull-right" role="group" aria-label="...">
                <Link to={`/hint/addhint/${this.props.rightClickLatLng[0]}/${this.props.rightClickLatLng[1]}`} className={'btn btn-primary'}><i className="fa fa-map-marker" aria-hidden="true"></i> Verstuur locatie</Link>
                <Link to={`/hint/addhunt/${this.props.rightClickLatLng[0]}/${this.props.rightClickLatLng[1]}`} className={'btn btn-primary'}><i className="fa fa-star" aria-hidden="true"></i> Meld hunt</Link>
              </div>
            </div>}
          </div>
        </div>
        }
        <StatusBar
          loading={this.props.loadingStatus} error={this.props.errorStatus} status={this.props.status}
          huntCount={huntCount}
        />
        <div className="well">

          <div className="btn-group" role="group" aria-label="...">
            <Toggle
              on={<span>Oneindig</span>}
              off={<span>Maximaal {historyTime} uur</span>}
              active={this.props.history}
              onstyle="default"
              offstyle="primary"
              onClick={() => this.onHistoryToggle(this.props.history)}
            />
            &nbsp;

            <button onClick={this.reloadAll} className={'btn btn-primary'}>
              <i className="fa fa-refresh" aria-hidden="true"></i> Herlaad gegevens
            </button>
          </div>
        </div>
      </div>
    );
  }
}

MassiveMap.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.bool,
  loading: PropTypes.bool,
  carsLoading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  cars: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
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
  carsError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  status: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  loadRightClick: PropTypes.bool,
  rightClickLatLng: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  clickLocationInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
};

const mapStateToProps = createStructuredSelector({
  MassiveMap: makeSelectMassiveMap(),
  loading: loadingSelector(),
  hints: hintsSelector(),
  history: historySelector(),
  error: errorSelector(),
  errorStatus: errorStatusSelector(),
  loadingStatus: loadingStatusSelector(),
  status: statusSelector(),
  cars: carsSelector(),
  carsLoading: carsLoadingSelector(),
  carsError: carsErrorSelector(),
  rightClickLatLng: rightClickLatLngSelector(),
  loadRightClick: loadRightClickSelector(),
  clickLocationInfo: loadRightClickLocationSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MassiveMap);
