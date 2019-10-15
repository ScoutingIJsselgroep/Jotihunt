import { createSelector } from 'reselect';

/**
 * Direct selector to the MapGroups state domain
 */
const selectMapGroupsDomain = () => (state) => state.get('mapGroups');

/**
 * Other specific selectors
 */
 const loadingSelector = () => createSelector(
   selectMapGroupsDomain(),
   (state) => state.get('loading')
 );

 const errorSelector = () => createSelector(
   selectMapGroupsDomain(),
   (state) => state.get('error')
 );

 const groupsSelector = () => createSelector(
   selectMapGroupsDomain(),
   (state) => state.get('groups')
 );

 /**
  * Default selector used by MapGroups
  */

 const makeSelectMapGroups = () => createSelector(
   selectMapGroupsDomain(),
   (substate) => substate.toJS()
 );

 export default makeSelectMapGroups;

 export {
   loadingSelector,
   errorSelector,
   groupsSelector,
 };
