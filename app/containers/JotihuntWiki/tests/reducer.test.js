
import { fromJS } from 'immutable';
import jotihuntWikiReducer from '../reducer';

describe('jotihuntWikiReducer', () => {
  it('returns the initial state', () => {
    expect(jotihuntWikiReducer(undefined, {})).toEqual(fromJS({}));
  });
});
