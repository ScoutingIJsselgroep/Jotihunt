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

// import styled from 'styled-components';
import {
  loadingSelector,
  groupsSelector,
  errorSelector,
} from './selectors';
import { loadGroups, setSubarea, } from './actions';
function circle(lat, lng) {
  return (<Circle
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
    socket.on('please_refresh_groups', function(msg){
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
      // console.log(diagram.cells);
      const options = {
          fillColor: `#${cell.site.subarea.color}`,
          fillOpacity: 0.14,
          strokeWeight: 0,
      };
      let path = [];
      _.map(cell.halfedges, (edge) => {
        path.push({lat: edge.getStartpoint().x, lng: edge.getStartpoint().y});
        path.push({lat: edge.getEndpoint().x, lng: edge.getEndpoint().y});
      });

      return (<Polygon key={i} onRightClick={(evt) => {rightClick(evt, cell.site.subarea.name);}} path={path} options={options} />);
    });

    // Draw vertices

    // var sites = [ {x: 200, y: 200, dd: 10}, {x: 50, y: 250, dd: 30}, {x: 400, y: 100, dd: 20} /* , ... */ ];


    // console.log(diagram.cells);
    return polygons;
  }

  render() {
    const voronoi = this.getVoronoi(this.props.groups, this.props.onRightClick);
    if (this.props.groups && this.props.showGroups !== false) {
      return <div> {voronoi} {_.map(this.props.groups, (group, index) => circle(group.latitude, group.longitude))} {_.map(this.props.groups, (group, index) =>
        <GroupMarker group={group} key={index} changeSubarea={this.onChangeSubarea} />)} </div>
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
