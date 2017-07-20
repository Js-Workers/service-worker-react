import React from 'react';
import { Route } from 'react-router-dom';
import App from './app';

const Routes = () => {
  return (
    <Route path="/" component={App}/>
  );
};

export default Routes;
