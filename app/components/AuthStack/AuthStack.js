import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Greeting from '../Greeting/Greeting';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ForgotPassword from '../ForgotPassword/ForgotPassword';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="Greeting">
      <Stack.Screen name="Greeting" component={Greeting} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}

export default AuthStack;
