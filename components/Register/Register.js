import React from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import Center from '../Center/Center';

const Register = () => {
  return (
    <Center>
      <View>
        <Text>Name:</Text>
        <TextInput placeholder="Julia Sho" />
        <Text>Email:</Text>
        <TextInput placeholder="Email" />
        <Text>Password:</Text>
        <TextInput placeholder="Password" />
      </View>
      <Text>Forgot password?</Text>
    </Center>
  );
};

export default Register;
