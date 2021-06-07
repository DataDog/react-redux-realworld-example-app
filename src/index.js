import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { store, history} from './store';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import App from './components/App';
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '143727b3-8d29-44f5-b4bc-6c9510a921ca',
    clientToken: 'pube5b4c3745f12edc924be9f9c7be6cd39',
    site: 'datadoghq.com',
    service:'conduit',
    // Specify a version number to identify the deployed version of your application in Datadog 
    // version: '1.0.0',
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
