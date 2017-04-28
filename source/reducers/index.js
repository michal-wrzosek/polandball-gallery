import { combineReducers } from 'redux';
import appReducer from './appReducer';
import routerReducer from './routerReducer';

export default combineReducers({
  app: appReducer,
  routing: routerReducer,
});
