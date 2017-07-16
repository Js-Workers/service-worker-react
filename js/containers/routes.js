import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './app';

const Routes = () => {
  return (
    <div>
      <Route component={App}/>
      <Switch>
        <Route path='/test' render={ () => <div>asd</div>} />
      </Switch>
    </div>
  );
};

export default Routes;
