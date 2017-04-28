import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = fromJS({
  locationBeforeTransitions: null,
});

const actionsMap = {
  [LOCATION_CHANGE]: (state, action) => {
    return state.merge({
      locationBeforeTransitions: action.payload,
    });
  },
};

export default function routerReducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
