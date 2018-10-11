import { createSelector } from 'reselect';

/**
 * Direct selector to the clairvoyance state domain
 */
const selectClairvoyanceDomain = () => (state) => state.get('clairvoyance');

/**
 * Other specific selectors
 */
const makeSelectLoading = () => createSelector(
  selectClairvoyanceDomain(),
  (state) => state.get('loading')
);

const hintsSelector = () => createSelector(
  selectClairvoyanceDomain(),
  (state) => state.get('hints')
);

const makeSelectResult = () => createSelector(
  selectClairvoyanceDomain(),
  (state) => state.get('result')
);

const makeSelectSuccess = () => createSelector(
  selectClairvoyanceDomain(),
  (state) => state.get('success')
);

const makeSelectError = () => createSelector(
  selectClairvoyanceDomain(),
  (state) => state.get('error')
);

const makeSelectHintValues = () => createSelector(
  selectClairvoyanceDomain(),
  (state) => state.get('sendValues')
);
/**
 * Default selector used by Clairvoyance
 */

const makeSelectClairvoyance = () => createSelector(
  selectClairvoyanceDomain(),
  (substate) => substate.toJS()
);

export default makeSelectClairvoyance;
export {
  selectClairvoyanceDomain,
  makeSelectHintValues,
  makeSelectResult,
  makeSelectLoading,
  makeSelectSuccess,
  makeSelectError,
  hintsSelector,
};
