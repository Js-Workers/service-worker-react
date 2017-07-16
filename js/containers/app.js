import React from 'react';
import Index from '../components/index';
import LoaderContainer from './loader';
import ServiceWorker from './service-workert';

const App = ({ children }) => (
  <div className="app">
    <Index />
    { children }
    <LoaderContainer />
    <ServiceWorker />
  </div>
);

export default App;
