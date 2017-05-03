import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  Router,
  IndexRoute,
  Route,
  browserHistory,
  applyRouterMiddleware,
} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
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

const scrollCallback = (prevRouterProps, { location }) => {
  if (
    prevRouterProps &&
    prevRouterProps.location.pathname.includes('/galleries/') &&
    location.pathname === '/'
  ) {
    return `GalleryItem_${ prevRouterProps.location.pathname.split('/')[2] }`;
  }
  return true;
};

render(
  <Provider store={ store }>
    <Router
      history={ history }
      render={ applyRouterMiddleware(useScroll(scrollCallback)) }
    >
      <Route path='/' component={ App }>
        <IndexRoute component={ Homepage } />
        <Route path='/galleries/:id' component={ Gallery } />
        <Route path='*' component={ NotFound } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
