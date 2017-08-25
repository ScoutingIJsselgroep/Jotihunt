/*
 *
 * GroupList
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import GroupListItem from 'components/GroupListItem';

import { createStructuredSelector } from 'reselect';
import { loadGroups } from './actions';
import makeSelectGroupList, { errorLoadingGroupsSelector, groupsSelector, loadingGroupsSelector } from './selectors';

export class GroupList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.loadGroups();
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Groepen
        </div>
        <div className="panel-body">
        </div>
        <table className="table">
          <thead>
          </thead>
          <tbody>
            {this.props.groups && this.props.groups.map((group, index) =>
              <GroupListItem key={index} group={group}/>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

GroupList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadGroups: PropTypes.func.isRequired,
  groups: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  errorLoadingGroupsSelector: PropTypes.oneOfType([
    PropTypes.obj,
    PropTypes.bool,
  ]),
  loadingGroups: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  GroupList: makeSelectGroupList(),
  groups: groupsSelector(),
  errorLoadingGroups: errorLoadingGroupsSelector(),
  loadingGroups: loadingGroupsSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadGroups: () => {
      dispatch(loadGroups());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
