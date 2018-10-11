
import { fromJS } from 'immutable';
import addHintContainerReducer from '../reducer';

describe('addHintContainerReducer', () => {
  it('returns the initial state', () => {
    expect(addHintContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
