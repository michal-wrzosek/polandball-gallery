import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

const isProduction = process.env.NODE_ENV === 'production';

export default function configureStore() {
  let store = null;

  if (isProduction) {
    const middleware = applyMiddleware(thunk);

    store = createStore(
      rootReducer,
      middleware
    );
  } else {
    const middleware = applyMiddleware(thunk, logger);

    /* eslint-disable no-underscore-dangle */
    const enhancer = compose(
      middleware,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    /* eslint-enable */

    store = createStore(
      rootReducer,
      enhancer
    );
  }

  return store;
}
