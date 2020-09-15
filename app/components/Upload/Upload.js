import React, {useContext} from 'react';
import 'react-native-get-random-values';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthContext} from '../AuthProvider/AuthProvider';
import Record from './Record';
import UploadFile from './UploadFile';
import UploadChoice from './UploadChoice';

const Stack = createStackNavigator();

function Upload() {
  const {user} = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="UploadChoice">
      <Stack.Screen name="UploadChoice" component={UploadChoice} />
      <Stack.Screen name="Record" component={Record} />
      <Stack.Screen name="UploadFile" component={UploadFile} />
    </Stack.Navigator>
  );
}

export default Upload;
