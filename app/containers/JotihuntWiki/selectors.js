import { createSelector } from 'reselect';

/**
 * Direct selector to the jotihuntWiki state domain
 */
const selectJotihuntWikiDomain = () => (state) => state.get('jotihuntWiki');

/**
 * Other specific selectors
 */
const makeSelectLoading = () => createSelector(
  selectJotihuntWikiDomain(),
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectJotihuntWikiDomain(),
  (globalState) => globalState.get('error')
);

const makeSelectResult = () => createSelector(
  selectJotihuntWikiDomain(),
  (globalState) => globalState.get('result')
);


/**
 * Default selector used by JotihuntWiki
 */

const makeSelectJotihuntWiki = () => createSelector(
  selectJotihuntWikiDomain(),
  (substate) => substate.toJS()
);

export default makeSelectJotihuntWiki;
export {
  selectJotihuntWikiDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectResult,
};
