/**
 * @format
 * @flow
 */

import React from 'react';

import AuthProvider from './components/AuthProvider/AuthProvider';
import Routes from './components/Routes/Routes';

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
