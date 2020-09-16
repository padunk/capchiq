import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import Greeting from '../Greeting/Greeting';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ForgotPassword from '../ForgotPassword/ForgotPassword';

type RootStackParamList = {
  Greeting: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

type StackScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Greeting'
>;

export type AuthProps = {
  navigation: StackScreenNavigationProp;
};

const Stack = createStackNavigator<RootStackParamList>();

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
