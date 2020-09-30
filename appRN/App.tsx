/**
 * @flow
 * @format
 */

import * as React from 'react';
import 'react-native-get-random-values';
import MainScreen from './components/Screens/MainScreen';
import {LogBox} from 'react-native';

const App = () => {
  // ignoring warning about long set timeout due to using firebase I guess
  // this is not the best work a round, but will do for now.
  LogBox.ignoreLogs(['Setting a timer']);
  return (
    <>
      <MainScreen />
    </>
  );
};

export default App;
