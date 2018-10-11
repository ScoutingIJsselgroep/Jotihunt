
import { fromJS } from 'immutable';
import groupListReducer from '../reducer';

describe('groupListReducer', () => {
  it('returns the initial state', () => {
    expect(groupListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
