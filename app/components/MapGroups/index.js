/**
*
* MapGroups
*
*/

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Polygon } from 'react-google-maps';
import openSocket from 'socket.io-client';
import { Circle } from 'react-google-maps';

import GroupMarker from 'components/GroupMarker';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import Voronoi from '../../utils/voronoi';
import { REFRESH_GROUPS } from '../../../server/socket_actions'; 

// import styled from 'styled-components';
import {
  loadingSelector,
  groupsSelector,
  errorSelector,
} from './selectors';
import { loadGroups, setSubarea, } from './actions';
function circle(lat, lng, index) {
  return (<Circle
    key={index}
    options={{
      fillColor: '#d43f3a',
      fillOpacity: 0.1,
      strokeColor: '#d43f3a',
      strokeOpacity: 0.5,
      strokeWeight: 2,
    }}
    defaultCenter={{ lat: lat, lng: lng }}
    defaultRadius={500}
  />);
}


class MapGroups extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.onChangeSubarea = this.onChangeSubarea.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(loadGroups());

    const socket = openSocket();
    socket.on(REFRESH_GROUPS, () => {
      dispatch(loadGroups());
    });
  }

  onChangeSubarea(event, groupId) {
    const { dispatch } = this.props;
    dispatch(setSubarea(event.target.value, groupId));
  }

  getVoronoi(groups, rightClick) {
    const voronoi = new Voronoi();

    const bbox = {xl: 51.7, xr: 52.5, yt: 5.2, yb: 6.5}; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom

    const sites = _.map(groups, (group) => {
      return {x: group.latitude, y: group.longitude, subarea: group.Subarea};
    });

    const diagram = voronoi.compute(sites, bbox);

    const polygons = _.map(diagram.cells, (cell, i) => {
      let opacity = cell.site.subarea.id === 7 ? 0 : 0.20 // Make unknown subareas not visible
      const options = {
          fillColor: `#${cell.site.subarea.color}`,
          fillOpacity: opacity,
          strokeWeight: 0,
      };
      let path = [];
      _.map(cell.halfedges, (edge) => {
        path.push({lat: edge.getStartpoint().x, lng: edge.getStartpoint().y});
        path.push({lat: edge.getEndpoint().x, lng: edge.getEndpoint().y});
      });

      return (<Polygon key={i} onRightClick={(evt) => {rightClick(evt, cell.site.subarea.name);}} path={path} options={options} />);
    });

    return polygons;
  }

  render() {
    const voronoi = this.getVoronoi(this.props.groups, this.props.onRightClick);
    if (this.props.groups && this.props.showGroups !== false) {
      return <div> {voronoi} {_.map(this.props.groups, (group, index) => circle(group.latitude, group.longitude, index))} {_.map(this.props.groups, (group, index) =>
        <GroupMarker group={group} key={index} changeSubarea={this.onChangeSubarea} onInfoWindow={this.props.onInfoWindow} />)} </div>
    }
    return <div></div>
  }
}

MapGroups.propTypes = {
  dispatch: PropTypes.func.isRequired,
  groups: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  loading: PropTypes.bool,
  mapGroups: PropTypes.bool,
  onInfoWindow: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: loadingSelector(),
  groups: groupsSelector(),
  error: errorSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapGroups);
