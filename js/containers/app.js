import React from 'react';
import LoaderContainer from './loader';
import MoviesListContainer from './movies-list';
import ServiceWorker from './service-workert';

const App = () => (
  <div className="app">
    <MoviesListContainer />
    <LoaderContainer />
    <ServiceWorker />
  </div>
);

export default App;
