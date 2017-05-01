import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger';
import rootReducer from './reducers/rootReducer';
import rootSaga from './sagas/rootSaga';

const isProduction = process.env.NODE_ENV === 'production';

export default function configureStore() {
  let store = null;
  const sagaMiddleware = createSagaMiddleware();

  if (isProduction) {
    const middleware = applyMiddleware(sagaMiddleware);

    store = createStore(
      rootReducer,
      middleware
    );
  } else {
    const middleware = applyMiddleware(sagaMiddleware, logger);

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

  sagaMiddleware.run(rootSaga);

  return store;
}
