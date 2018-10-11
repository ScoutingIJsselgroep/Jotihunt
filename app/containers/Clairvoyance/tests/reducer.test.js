
import { fromJS } from 'immutable';
import clairvoyanceReducer from '../reducer';

describe('clairvoyanceReducer', () => {
  it('returns the initial state', () => {
    expect(clairvoyanceReducer(undefined, {})).toEqual(fromJS({}));
  });
});
