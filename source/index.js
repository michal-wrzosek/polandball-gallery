import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store';
import App from './containers/App';
import Homepage from './views/Homepage';
import Gallery from './views/Gallery';
import NotFound from './components/NotFound';
import './assets/scss/main.scss';

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
      <Route path='/' component={ App }>
        <IndexRoute component={ Homepage } />
        <Route path='/galleries/:id' component={ Gallery } />
        <Route path='*' component={ NotFound } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
