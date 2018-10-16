/*
 *
 * GroupList
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import GroupListItem from 'components/GroupListItem';
import SearchGroupList from 'components/SearchGroupList';
import Helmet from 'react-helmet';

import { Form, Text } from 'react-form';

import { createStructuredSelector } from 'reselect';
import { loadGroups, performSearch, incrementGroup } from './actions';
import makeSelectGroupList, { searchSelector, errorLoadingGroupsSelector, groupsSelector, loadingGroupsSelector } from './selectors';

export class GroupList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onIncrementGroup = this.onIncrementGroup.bind(this);
  }

  componentDidMount() {
    this.props.loadGroups();
  }

  onSearchChange({search}) {
    const { dispatch } = this.props;
    dispatch(performSearch(search));
  }

  onIncrementGroup(value, groupId) {
    const {dispatch} = this.props;
    dispatch(incrementGroup(value, groupId));
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default" style={{ overflow: 'auto' }}>
          <Helmet
            title="Groepen"
            titleTemplate="%s | Jotihunt.js"
            meta={[
              { name: 'description', content: 'Een lijst van alle groepen.' },
            ]}
          />
          <div className="panel-heading">
            Groepen {this.props.groups.length == 0 && <a href='/api/group/fill' className='btn btn-default pull-right'>Importeer groepen</a>}
          </div>
          <div className="panel-body">
            <SearchGroupList onSearchChange={this.onSearchChange} />
          </div>
          <table className="table">
            <thead>
            </thead>
            <tbody>
              {this.props.groups && this.props.groups.map((group, index) => {
                if (!this.props.search || this.props.search == "" ||
                  JSON.stringify(group).toUpperCase().includes(this.props.search.toUpperCase())) {
                  return <GroupListItem key={index} group={group} increment={this.onIncrementGroup}/>;
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
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
  searchSelector: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
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
  search: searchSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadGroups: () => {
      dispatch(loadGroups());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
