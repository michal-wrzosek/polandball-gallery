import { Map } from 'immutable';

// import {} from '../actions/app';

const initialState = Map({
  imgurClientId: '7b1f7a9c25b701b',
  imgurHttpEndpoint: 'https://api.imgur.com/3/',
});

const actionsMap = {};

export default function appReducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
