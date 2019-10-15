import { createSelector } from 'reselect';

/**
 * Direct selector to the addHunt state domain
 */
const selectAddHuntDomain = () => (state) => state.get('addHunt');

/**
 * Other specific selectors
 */
const locationLoadingSelector = () =>  createSelector(
  selectAddHuntDomain(),
  (state) => state.get('locationLoading')
);
const locationErrorSelector = () =>  createSelector(
  selectAddHuntDomain(),
  (state) => state.get('locationError')
);
const locationResultSelector = () =>  createSelector(
  selectAddHuntDomain(),
  (state) => state.get('locationResult')
);

const huntLoadingSelector = () =>  createSelector(
  selectAddHuntDomain(),
  (state) => state.get('huntLoading')
);
const huntResultSelector = () =>  createSelector(
  selectAddHuntDomain(),
  (state) => state.get('huntResult')
);
const huntErrorSelector = () =>  createSelector(
  selectAddHuntDomain(),
  (state) => state.get('huntError')
);

const locationSubareaSelector = () =>  createSelector(
  selectAddHuntDomain(),
  (state) => state.get('subarea')
);

/**
 * Default selector used by AddHunt
 */

const makeSelectAddHunt = () => createSelector(
  selectAddHuntDomain(),
  (substate) => substate.toJS()
);

export default makeSelectAddHunt;
export {
  selectAddHuntDomain,
  locationLoadingSelector,
  locationErrorSelector,
  locationResultSelector,
  huntLoadingSelector,
  huntErrorSelector,
  huntResultSelector,
  locationSubareaSelector,
};
