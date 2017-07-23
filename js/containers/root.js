import React from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import Routes from './routes';

const Root = ({ store }) => (
  <Provider store={ store }>
    <Router history={browserHistory} children={Routes} />
  </Provider>
);

export default Root;
