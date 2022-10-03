import {
  createSelector
} from 'reselect';

/**
 * Direct selector to the messageList state domain
 */
const selectMessageListDomain = () => (state) => state.get('messageList');

/**
 * Other specific selectors
 */
const loadingMessageSelector = () => createSelector(
  selectMessageListDomain(),
  (state) => state.get('loadingMessage')
);

const messageSelector = () => createSelector(
  selectMessageListDomain(),
  (state) => state.get('message')
);

const errorLoadingMessageSelector = () => createSelector(
  selectMessageListDomain(),
  (state) => state.get('errorLoadingMessage')
);

const searchSelector = () => createSelector(
  selectMessageListDomain(),
  (state) => state.get('search')
);

/**
 * Default selector used by MessageList
 */

const makeSelectMessageList = () => createSelector(
  selectMessageListDomain(),
  (substate) => substate.toJS()
);

export default makeSelectMessageList;
export {
  selectMessageListDomain,
  loadingMessageSelector,
  messageSelector,
  searchSelector,
  errorLoadingMessageSelector,
};