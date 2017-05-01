import { combineReducers } from 'redux';
import appReducer from './appReducer';
import imagesReducer from './imagesReducer';
import routerReducer from './routerReducer';

export default combineReducers({
  app: appReducer,
  images: imagesReducer,
  routing: routerReducer,
});
