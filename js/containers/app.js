import React from 'react';
import LoaderContainer from './loader';

const App = ({ children }) => (
  <div>
    { children }
    <LoaderContainer />
  </div>
);

export default App;
