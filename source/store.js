import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from './reducers/rootReducer';
import rootSaga from './sagas/rootSaga';

const isProduction = process.env.NODE_ENV === 'production';

export default function configureStore() {
  let store = null;
  const sagaMiddleware = createSagaMiddleware();

  if (isProduction) {
    const middleware = applyMiddleware(
      routerMiddleware(browserHistory),
      sagaMiddleware
    );

    store = createStore(
      rootReducer,
      middleware
    );
  } else {
    const middleware = applyMiddleware(
      logger,
      routerMiddleware(browserHistory),
      sagaMiddleware
    );

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
