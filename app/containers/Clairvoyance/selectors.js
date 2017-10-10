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

const makeSelectResult = () => createSelector(
  selectClairvoyanceDomain(),
  (state) => state.get('result')
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
  makeSelectResult,
  makeSelectLoading,
};
