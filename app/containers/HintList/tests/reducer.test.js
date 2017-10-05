
import { fromJS } from 'immutable';
import hintListReducer from '../reducer';

describe('hintListReducer', () => {
  it('returns the initial state', () => {
    expect(hintListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
