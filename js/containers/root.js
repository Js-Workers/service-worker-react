import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import history from '../history';
import Routes from '../containers/routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Root = ({ store }) => (
  <Provider store={ store }>
    <ConnectedRouter history={ history } >
      <MuiThemeProvider>
        <Routes/>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>
);

export default Root;
