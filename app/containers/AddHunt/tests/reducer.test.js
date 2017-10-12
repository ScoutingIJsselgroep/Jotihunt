
import { fromJS } from 'immutable';
import addHuntReducer from '../reducer';

describe('addHuntReducer', () => {
  it('returns the initial state', () => {
    expect(addHuntReducer(undefined, {})).toEqual(fromJS({}));
  });
});
