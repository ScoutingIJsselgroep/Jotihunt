import { createSelector } from 'reselect';

/**
 * Direct selector to the addHintContainer state domain
 */
const selectAddHintContainerDomain = () => (state) => state.get('addHintContainer');

/**
 * Other specific selectors
 */
const makeSelectRdx = () => createSelector(
   selectAddHintContainerDomain(),
   (state) => state.get('rdx')
);

const makeSelectRdy = () => createSelector(
   selectAddHintContainerDomain(),
   (state) => state.get('rdy')
);

const makeSelectLoading = () => createSelector(
  selectAddHintContainerDomain(),
  (state) => state.get('loading')
);

const makeSelectAddress = () => createSelector(
  selectAddHintContainerDomain(),
  (state) => state.get('address')
);

const makeSelectSubarea = () => createSelector(
  selectAddHintContainerDomain(),
  (state) => state.get('subarea')
);

const makeSelectWgs = () => createSelector(
  selectAddHintContainerDomain(),
  (state) => state.get('wgs')
);

const makeSelectHintSubmitted = () => createSelector(
  selectAddHintContainerDomain(),
  (state) => state.get('submittingSuccess')
);

/**
 * Default selector used by AddHintContainer
 */

const makeSelectAddHintContainer = () => createSelector(
  selectAddHintContainerDomain(),
  (substate) => substate.toJS()
);

export default makeSelectAddHintContainer;
export {
  makeSelectRdx,
  selectAddHintContainerDomain,
  makeSelectAddress,
  makeSelectSubarea,
  makeSelectLoading,
  makeSelectHintSubmitted,
  makeSelectRdy,
  makeSelectWgs,
};
