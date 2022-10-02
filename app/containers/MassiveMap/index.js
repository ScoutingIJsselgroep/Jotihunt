/*
 *
 * MassiveMap
 *
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import createRef from 'create-react-ref/lib/createRef';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import { GoogleMap, withGoogleMap, Marker, TrafficLayer, DirectionsRenderer } from 'react-google-maps';
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";
import ProjectionMapper from 'components/ProjectionMapper/index';
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
  loadRightClickSubareaSelector,
  latlngSelector,
  hintsSelector,
  historySelector,
  loadingSelector,
  loadingStatusSelector, loadRightClickLocationSelector,
  loadRightClickSelector,
  rightClickLatLngSelector,
  statusSelector,
  predictionsSelector,
  searchResultSelector,
} from './selectors';
import { clearLocation, historyToggle, setLatLng, loadCars, loadHints, loadStatus, rightClickEvent, loadPredictions, setSearchResults } from './actions';
// import SubareaPolygons from '../../components/SubareaPolygons/index';
import MapCars from '../../components/MapCars/index';
import ClickMarker from '../../components/ClickMarker/index';
import HintPath from '../../components/HintPath/index';
import MapGroups from '../../components/MapGroups';

import '../../../node_modules/react-bootstrap-toggle/dist/bootstrap2-toggle.css';
import LoadingIndicator from '../../components/LoadingIndicator/index';

const config = require('./../../../config');

const historyTime = require('../../../config').map.historyTime;


const MyMapComponent = withGoogleMap((props) =>
  <GoogleMap
    options={{scaleControl: true}}
    defaultZoom={10}
    defaultCenter={{ lat: props.latlng.get('lat'), lng: props.latlng.get('lng') }}
    center={{ lat: props.latlng.get('lat'), lng: props.latlng.get('lng') }}
    onRightClick={props.onRightClick}
    onDragEnd={props.onChangeMapCenter}
    onZoomChanged={props.onChangeMapCenter}
    ref={props.ref}
  >
    {props.children}
  </GoogleMap>
);

export class MassiveMap extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.mapRef = createRef();
    this.searchBoxRef = createRef();
    this.reloadAll = this.reloadAll.bind(this);
    this.onHistoryToggle = this.onHistoryToggle.bind(this);
    this.onClearLocation = this.onClearLocation.bind(this);
    this.onRightClick = this.onRightClick.bind(this);
    this.onChangeMapCenter = this.onChangeMapCenter.bind(this);
    this.onRightClickSubarea = this.onRightClickSubarea.bind(this);
    this.onSearchBoxPlacesChanged = this.onSearchBoxPlacesChanged.bind(this);
    this.onSearchboxMounted = this.onSearchboxMounted.bind(this);
  }

  componentDidMount() {

    const socket = openSocket();
    socket.on('please_refresh_hints', function(msg){
      dispatch(loadHints());
      // dispatch(loadPredictions());
    });
    socket.on('status', function(msg){
      dispatch(loadStatus());
    });

    socket.on('car', function(msg){
      dispatch(loadCars());
    });

    // Update predictions every 30 seconds
    setInterval(() => dispatch(loadPredictions()),
      15 * 1000
    );

    // Go load hints
    const { dispatch } = this.props;
    dispatch(loadHints());
    dispatch(loadStatus());
    dispatch(loadCars());
    dispatch(loadPredictions());
  }

  onHistoryToggle(history) {
    const { dispatch } = this.props;
    dispatch(historyToggle(!history));
  }

  onRightClick(event) {
    const { dispatch } = this.props;
    dispatch(rightClickEvent([event.latLng.lat(), event.latLng.lng()], ""));
  }

  onSearchboxMounted(ref) {
    this.searchbox = ref;
  }

  onSearchBoxPlacesChanged() {
    const { dispatch } = this.props;

    const places = this.searchbox.getPlaces();
    const bounds = new google.maps.LatLngBounds();

    places.forEach(place => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport)
      } else {
        bounds.extend(place.geometry.location)
      }
    });
    const markers = places.map(place => ({
      position: place.geometry.location,
    }));
    
    if (markers.length === 1) {
      dispatch(rightClickEvent([markers[0].position.lat(), markers[0].position.lng()], ""));
      dispatch(setLatLng({lat: markers[0].position.lat(), lng: markers[0].position.lng()}));
    } else {
      dispatch(setSearchResults(markers));
      dispatch(clearLocation());
    }
  }

  onRightClickSubarea(event, subarea) {
    const { dispatch } = this.props;
    dispatch(rightClickEvent([event.latLng.lat(), event.latLng.lng()], subarea));
  }

  onChangeMapCenter(event) {
    const { dispatch } = this.props;
    if (event) {
      dispatch(setLatLng({lat: event[0], lng: event[1]}));
    } else {
      dispatch(setLatLng({lat: this.mapRef.current.state.map.center.lat(), lng: this.mapRef.current.state.map.center.lng()}));
    }
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
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${config.google.googleClientAuthToken}&v=3.exp&libraries=geometry,drawing,places,traffic`}
          containerElement={<div style={{ height: '80vh', marginLeft: '-10px', marginRight: '-10px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          onRightClick={this.onRightClick}
          onChangeMapCenter={this.onChangeMapCenter}
          latlng={this.props.latlng}
          ref={this.mapRef}
        >
          <SearchBox
            ref={this.onSearchboxMounted}
            controlPosition={google.maps.ControlPosition.TOP_CENTER}
            onPlacesChanged={this.onSearchBoxPlacesChanged}
          >
            <input
              type="text"
              placeholder="Zoeken..."
              style={{
                boxSizing: `border-box`,
                width: `300px`,
                height: `50px`,
                marginTop: `10px`,
                padding: `0 17px`,
                backgroundColor: `#FFFFFF`,
                //border: `2px solid rgb(26, 115, 232)`,
                outline: `none`,
                textOverflow: `ellipses`,
                border: `1px solid transparent`,
                borderRadius: `2px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `18px`,
                textOverflow: `ellipses`,
              }}
            />
          </SearchBox>
          {this.props.searchResults && this.props.searchResults.map((marker, index) =>
            <Marker key={index} position={marker.position} zIndex={1000} />
          )}
          {this.props.rightClickLatLng &&
          <ClickMarker 
            latlng={this.props.rightClickLatLng} 
            loading={this.props.loadRightClick}
            clickLocationInfo={this.props.clickLocationInfo}
          />
          }
          <MapGroups onRightClick={this.onRightClickSubarea}/>
          {this.props.hints && HintPath(this.props.hints, this.props.history, this.onRightClick)}
          {this.props.cars && MapCars(this.props.cars, this.props.history).map((car) => car)}
          {this.props.predictions && ProjectionMapper(this.props.predictions).map((object) => object)}
        </MyMapComponent>
        <StatusBar
          changeMapCenter={this.onChangeMapCenter}
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
  searchBoxMarkers: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
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
  predictions: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
};

const mapStateToProps = createStructuredSelector({
  MassiveMap: makeSelectMassiveMap(),
  loading: loadingSelector(),
  hints: hintsSelector(),
  latlng: latlngSelector(),
  history: historySelector(),
  error: errorSelector(),
  errorStatus: errorStatusSelector(),
  loadingStatus: loadingStatusSelector(),
  status: statusSelector(),
  cars: carsSelector(),
  predictions: predictionsSelector(),
  carsLoading: carsLoadingSelector(),
  carsError: carsErrorSelector(),
  rightClickLatLng: rightClickLatLngSelector(),
  loadRightClick: loadRightClickSelector(),
  clickLocationInfo: loadRightClickLocationSelector(),
  rightClickSubarea: loadRightClickSubareaSelector(),
  searchResults: searchResultSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MassiveMap);
