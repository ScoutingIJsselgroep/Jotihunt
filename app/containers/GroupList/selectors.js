import { createSelector } from 'reselect';

/**
 * Direct selector to the groupList state domain
 */
const selectGroupListDomain = () => (state) => state.get('groupList');

/**
 * Other specific selectors
 */
const loadingGroupsSelector = () =>  createSelector(
  selectGroupListDomain(),
  (state) => state.get('loadingGroups')
);

const groupsSelector = () =>  createSelector(
  selectGroupListDomain(),
  (state) => state.get('groups')
);

const errorLoadingGroupsSelector = () =>  createSelector(
  selectGroupListDomain(),
  (state) => state.get('errorLoadingGroups')
);

/**
 * Default selector used by GroupList
 */

const makeSelectGroupList = () => createSelector(
  selectGroupListDomain(),
  (substate) => substate.toJS()
);

export default makeSelectGroupList;
export {
  selectGroupListDomain,
  loadingGroupsSelector,
  groupsSelector,
  errorLoadingGroupsSelector,
};
