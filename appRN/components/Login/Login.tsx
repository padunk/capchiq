import React, {useState, useContext} from 'react';
import {Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {AuthContext} from '../AuthProvider/AuthProvider';
import {AuthProps} from '../AuthStack/AuthStack';
import Center from '../Center/Center';
import {globalStyles} from '../Style/styles';

const Register = ({navigation}: AuthProps) => {
  const {loginError: errorMessage, login} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Center>
      <Text style={globalStyles.title}>Hi, welcome back!</Text>
      <View style={globalStyles.form}>
        <View style={globalStyles.inputWrapper}>
          <Text style={globalStyles.inputTitle}>Email / Username:</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Email / Username"
            onChangeText={(givenEmail) => setEmail(givenEmail)}
          />
        </View>
        <View>
          <Text style={globalStyles.inputTitle}>Password:</Text>
          <TextInput
            style={globalStyles.input}
            secureTextEntry
            onChangeText={(givenPassword) => setPassword(givenPassword)}
          />
        </View>
      </View>
      <View>
        {errorMessage && <Text style={globalStyles.error}>{errorMessage}</Text>}
      </View>
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => login(email, password)}>
        <Text style={globalStyles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={globalStyles.inform}>
          New user?{' '}
          <Text
            style={globalStyles.link}
            onPress={() => navigation.navigate('Register')}>
            Register
          </Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={globalStyles.link}
          onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot Password
        </Text>
      </TouchableOpacity>
    </Center>
  );
};

export default Register;
