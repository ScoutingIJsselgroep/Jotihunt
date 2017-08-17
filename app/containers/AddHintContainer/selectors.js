import { createSelector } from 'reselect';

/**
 * Direct selector to the addHintContainer state domain
 */
const selectAddHintContainerDomain = () => (state) => state.get('addHintContainer');

/**
 * Other specific selectors
 */
const makeSelectRdx = () => createSelector(
   selectAddHintContainerDomain,
   (state) => state.get('rdx')
);

const makeSelectRdy = () => createSelector(
   selectAddHintContainerDomain,
   (state) => state.get('rdy')
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
  makeSelectRdy,
};
