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

const carsErrorSelector = () => createSelector(
  selectMassiveMapDomain(),
  (state) => state.get('carsError')
);


const carsLoadingSelector = () => createSelector(
  selectMassiveMapDomain(),
  (state) => state.get('carsLoading')
);


const carsSelector = () => createSelector(
  selectMassiveMapDomain(),
  (state) => state.get('cars')
);

const historySelector = () => createSelector(
  selectMassiveMapDomain(),
  (state) => state.get('history')
);

const rightClickLatLngSelector = () => createSelector(
  selectMassiveMapDomain(),
  (state) => state.get('rightClickLatLng')
);


const loadRightClickSelector = () => createSelector(
  selectMassiveMapDomain(),
  (state) => state.get('loadRightClick')
);


const loadRightClickLocationSelector = () => createSelector(
  selectMassiveMapDomain(),
  (state) => state.get('rightClickLocation')
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
  historySelector,
  loadingStatusSelector,
  errorStatusSelector,
  statusSelector,
  carsErrorSelector,
  carsLoadingSelector,
  carsSelector,
  loadRightClickSelector,
  rightClickLatLngSelector,
  loadRightClickLocationSelector,
};
