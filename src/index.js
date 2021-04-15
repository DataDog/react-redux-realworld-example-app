import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { store, history} from './store';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { datadogRum } from '@datadog/browser-rum';

import App from './components/App';

datadogRum.init({
    applicationId: process.env.REACT_APP_ID,
    clientToken: process.env.REACT_APP_CLIENT_TOKEN,
    site: 'datadoghq.com',
    service: 'Conduit',
    sampleRate: 100,
    trackInteractions: true
});

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>

), document.getElementById('root'));
