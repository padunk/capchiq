/**
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import Layout from './components/Layout/Layout';
import {Text} from 'react-native';
import AuthProvider from './components/AuthProvider/AuthProvider';
import Routes from './components/Routes/Routes';

const App = () => {
  return (
    <>
      <AuthProvider>
        <Layout>
          <Routes />
        </Layout>
      </AuthProvider>
    </>
  );
};

export default App;
