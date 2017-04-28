import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import 'babel-polyfill';
import configureStore from './store';
import routes from './routes';
import App from './containers/App';
import Homepage from './containers/Homepage';
import NotFound from './components/NotFound';

const store = configureStore();

const createSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;
  return (state) => {
    const routingState = state.routing;
    if (typeof prevRoutingState === 'undefined' || prevRoutingState !== routingState) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }
    return prevRoutingStateJS;
  };
};

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: createSelectLocationState(),
});

render(
  <Provider store={ store }>
    <Router history={ history }>
      <Route path={ routes.HOMEPAGE } component={ App }>
        <IndexRoute component={ Homepage } />
        <Route path={ routes.HOMEPAGE } component={ Homepage } />
        <Route path='*' component={ NotFound } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
