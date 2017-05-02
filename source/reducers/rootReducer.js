import { combineReducers } from 'redux';
import appReducer from './appReducer';
import galleriesReducer from './galleriesReducer';
import routerReducer from './routerReducer';

export default combineReducers({
  app: appReducer,
  galleries: galleriesReducer,
  routing: routerReducer,
});
