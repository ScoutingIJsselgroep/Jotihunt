import { createSelector } from 'reselect';

/**
 * Direct selector to the massiveMap state domain
 */
const selectMassiveMapDomain = () => (state) => state.get('massiveMap');

/**
 * Other specific selectors
 */
const loadingSelector = () => createSelector(
  selectMassiveMapDomain(),
  (state) => state.get('loading')
);

const hintsSelector = () => createSelector(
  selectMassiveMapDomain(),
  (state) => state.get('hints')
);

const errorSelector = () => createSelector(
  selectMassiveMapDomain(),
  (state) => state.get('error')
);

const loadingStatusSelector = () => createSelector(
  selectMassiveMapDomain(),
  (state) => state.get('loadingStatus')
);

const statusSelector = () => createSelector(
  selectMassiveMapDomain(),
  (state) => state.get('status')
);

const errorStatusSelector = () => createSelector(
  selectMassiveMapDomain(),
  (state) => state.get('errorStatus')
);


/**
 * Default selector used by MassiveMap
 */

const makeSelectMassiveMap = () => createSelector(
  selectMassiveMapDomain(),
  (substate) => substate.toJS()
);

export default makeSelectMassiveMap;
export {
  selectMassiveMapDomain,
  loadingSelector,
  hintsSelector,
  errorSelector,
  loadingStatusSelector,
  errorStatusSelector,
  statusSelector,
};
