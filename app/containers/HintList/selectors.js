import { createSelector } from 'reselect';

/**
 * Direct selector to the hintList state domain
 */
const selectHintListDomain = () => (state) => state.get('hintList');

/**
 * Other specific selectors
 */
const loadingHintsSelector = createSelector(
  selectHintListDomain(),
  (hintListState) => hintListState.get('loadingHints')
);

const hintsSelector = createSelector(
  selectHintListDomain(),
  (hintListState) => hintListState.get('hints')
);

const hintsErrorSelector = createSelector(
  selectHintListDomain(),
  (hintListState) => hintListState.get('errorLoadingHints')
);


/**
 * Default selector used by HintList
 */

const makeSelectHintList = () => createSelector(
  selectHintListDomain(),
  (substate) => substate.toJS()
);

export default makeSelectHintList;
export {
  loadingHintsSelector,
  selectHintListDomain,
  hintsSelector,
  hintsErrorSelector,
};
