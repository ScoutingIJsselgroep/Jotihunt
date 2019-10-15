/**
*
* MapGroups
*
*/

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import GroupMarker from 'components/GroupMarker';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

// import styled from 'styled-components';
import {
  loadingSelector,
  groupsSelector,
  errorSelector,
} from './selectors';
import { loadGroups } from './actions';

class MapGroups extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    console.log("loading Groups");
    // this.loadGroups = this.loadGroups.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    console.log("loading Groups");
    dispatch(loadGroups());
  }

  render() {
    console.log(this.props.groups);
    if (this.props.groups && this.props.showGroups !== false) {
      return <div> {_.map(this.props.groups, (group, index) =>
        <GroupMarker group={group} key={index} />)} </div>
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
