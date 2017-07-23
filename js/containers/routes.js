import React from 'react';
import {Route, Switch} from 'react-router';
import App from './app';
import MoviesListContainer from './movies-list';

export default (
  <Route component={App} >
    <Route exact={true} path="/" component={ MoviesListContainer } />
  </Route>
);
