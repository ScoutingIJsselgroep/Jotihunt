
import { fromJS } from 'immutable';
import massiveMapReducer from '../reducer';

describe('massiveMapReducer', () => {
  it('returns the initial state', () => {
    expect(massiveMapReducer(undefined, {})).toEqual(fromJS({}));
  });
});
