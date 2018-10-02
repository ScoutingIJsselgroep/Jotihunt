/*
 *
 * MassiveMap
 *
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import { GoogleMap, withGoogleMap, TrafficLayer} from 'react-google-maps';
import Toggle from 'react-bootstrap-toggle';
import StatusBar from 'components/StatusBar';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
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
import { clearLocation, historyToggle, loadCars, loadHints, loadStatus, rightClickEvent } from './actions';
import SubareaPolygons from '../../components/SubareaPolygons/index';
import MapGroups from '../../components/MapGroups';
import MapCars from '../../components/MapCars/index';
import ClickMarker from '../../components/ClickMarker/index';
import HintPath from '../../components/HintPath/index';
import MapCircle from '../../components/MapCircle';
import '../../../node_modules/react-bootstrap-toggle/dist/bootstrap2-toggle.css';
import LoadingIndicator from '../../components/LoadingIndicator/index';

const config = require('./../../../config');

const historyTime = require('../../../config').map.historyTime;


const MyMapComponent = withGoogleMap((props) =>
  <GoogleMap
    options={{scaleControl: true}}
    defaultZoom={10}
    defaultCenter={{ lat: 52.1023337615325, lng: 6.009883117643787 }}
    onRightClick={props.onRightClick}
  >
  {SubareaPolygons(props.onRightClick).map((subarea) => subarea)}
  {MapGroups().map((group) => group)}
  <MapCircle />
  {props.children}
  </GoogleMap>
);

export class MassiveMap extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.reloadAll = this.reloadAll.bind(this);
    this.onHistoryToggle = this.onHistoryToggle.bind(this);
    this.onClearLocation = this.onClearLocation.bind(this);
    this.onRightClick = this.onRightClick.bind(this);
  }

  componentDidMount() {

    const socket = openSocket();
    socket.on('please_refresh_hints', function(msg){
      dispatch(loadHints());
    });

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

  onClearLocation() {
    const { dispatch } = this.props;
    dispatch(clearLocation());
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

    return (
      <div>
        <Helmet
          title="Kaart"
          titleTemplate="%s | Jotihunt.js"
          meta={[
            { name: 'description', content: 'Een kaart met alles erop en eraan.' },
          ]}
        />
        <MyMapComponent
          isMarkerShown
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${config.google.googleAppId}v=3.exp&libraries=geometry,drawing,places,traffic`}
          containerElement={<div style={{ height: '80vh' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          onRightClick={this.onRightClick}
        >
          {this.props.rightClickLatLng &&
          <ClickMarker latlng={this.props.rightClickLatLng} />
          }
          {this.props.hints && HintPath(this.props.hints, this.props.history, this.onRightClick)}
          {this.props.cars && MapCars(this.props.cars, this.props.history).map((car) => car)}
        </MyMapComponent>
        {(this.props.loadRightClick || this.props.rightClickLatLng) &&
        <div className="panel panel-default">
          <div className="panel-heading"><i className="fa fa-map-marker" aria-hidden="true"></i> Geselecteerde locatie</div>
          <div className="panel-body">
            {this.props.loadRightClick && <LoadingIndicator />}
            {this.props.clickLocationInfo && !this.props.loadRightClick && <div>
              <span className="label label-default">{this.props.clickLocationInfo.subarea}</span> {this.props.clickLocationInfo.address[0] ? this.props.clickLocationInfo.address[0].formatted_address : 'Onbekende weg'}
              <div className="btn-group pull-right" role="group" aria-label="...">
                <Link to={`/hint/addhint/${this.props.rightClickLatLng[0]}/${this.props.rightClickLatLng[1]}`} className={'btn btn-primary'}><i className="fa fa-map-marker" aria-hidden="true"></i> Verstuur locatie</Link>
                <Link to={`/hint/addhunt/${this.props.rightClickLatLng[0]}/${this.props.rightClickLatLng[1]}`} className={'btn btn-primary'}><i className="fa fa-star" aria-hidden="true"></i> Meld hunt</Link>
                <button onClick={this.onClearLocation} className={'btn btn-default'}><i className="fa fa-times" aria-hidden="true"></i></button>
              </div>
            </div>}
          </div>
        </div>
        }
        <StatusBar
          loading={this.props.loadingStatus} error={this.props.errorStatus} status={this.props.status}
          huntCount={huntCount}
        >
          <Toggle
            on={<div>∞ <br />Oneindig</div>}
            off={<div><i className="fa fa-clock-o" aria-hidden="true"></i> <br /> {historyTime} uur</div>}
            active={this.props.history}
            onstyle="default"
            offstyle="primary"
            onClick={() => this.onHistoryToggle(this.props.history)}
          />
        </StatusBar>
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
