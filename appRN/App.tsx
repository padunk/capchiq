/**
 * @flow
 * @format
 */

import * as React from 'react';
import 'react-native-get-random-values';
import MainScreen from './components/Screens/MainScreen';
import {LogBox} from 'react-native';
import Coba from './components/Coba/Coba';
import {Provider} from 'react-redux';
import {_store} from './redux/store';

const App = () => {
  // ignoring warning about long set timeout due to using firebase I guess
  // this is not the best work a round, but will do for now.
  LogBox.ignoreLogs(['Setting a timer']);
  return (
    <Provider store={_store}>
      <MainScreen />
      {/* <Coba /> */}
    </Provider>
  );
};

export default App;
