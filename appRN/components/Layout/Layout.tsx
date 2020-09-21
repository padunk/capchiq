import React from 'react';
import {StatusBar} from 'react-native';

const Layout = ({children}: any) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      {children}
    </>
  );
};

export default Layout;
