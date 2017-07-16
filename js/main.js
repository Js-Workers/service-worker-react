import React from 'react';
import { render } from 'react-dom';
import configureStore from './store';
import Root from './containers/root';
import initialStore from './store/initial-store';
import injectTapEventPlugin from 'react-tap-event-plugin';

import 'styles/_base.scss';

const store = configureStore(initialStore);
const appContainer = document.getElementById('app');

const renderApp = () => {
  render(<Root store={ store }/>, appContainer);
};

injectTapEventPlugin();
renderApp();
