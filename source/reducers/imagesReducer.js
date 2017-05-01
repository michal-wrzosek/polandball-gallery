import Immutable, { List } from 'immutable';
import {
  GET_IMAGES_SUCCEEDED,
} from '../actions';

const initialState = List();

const actionsMap = {
  [GET_IMAGES_SUCCEEDED]: (state, action) => Immutable.fromJS(action.images),
};

export default function imagesReducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
