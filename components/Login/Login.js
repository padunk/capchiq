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

const Login = ({navigation}) => {
  return (
    <Center>
      <View>
        <Text>Email / UserName:</Text>
        <TextInput placeholder="Email / Username" />
        <Text>Password:</Text>
        <TextInput secureTextEntry />
      </View>
      <View>
        <Text>New user?</Text>
        <Button
          title="Register"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </Center>
  );
};

export default Login;
