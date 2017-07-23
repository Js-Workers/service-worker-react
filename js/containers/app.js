import React from 'react';
import LoaderContainer from './loader';
import ServiceWorker from './service-workert';

const App = ({ children }) => (
  <div>
    { children }
    <LoaderContainer />
    <ServiceWorker />
  </div>
);

export default App;
