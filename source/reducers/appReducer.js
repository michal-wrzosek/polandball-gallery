import { Map } from 'immutable';

import {
  GET_IMAGES,
  GET_IMAGES_SUCCEEDED,
  GET_IMAGES_FAILED,
  SEARCH,
  SEARCH_SUCCEEDED,
  SEARCH_FAILED,
} from '../actions';

const initialState = Map({
  isLoading: false,
});

const actionsMap = {
  [GET_IMAGES]: (state, action) => state.set('isLoading', true),
  [GET_IMAGES_SUCCEEDED]: (state, action) => state.set('isLoading', false),
  [GET_IMAGES_FAILED]: (state, action) => state.set('isLoading', false),
  [SEARCH]: (state, action) => state.set('isLoading', true),
  [SEARCH_SUCCEEDED]: (state, action) => state.set('isLoading', false),
  [SEARCH_FAILED]: (state, action) => state.set('isLoading', false),
};

export default function appReducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
