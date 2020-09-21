import React, {useState, useContext} from 'react';
import {Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {AuthContext} from '../AuthProvider/AuthProvider';
import {AuthProps} from '../AuthStack/AuthStack';
import Center from '../Center/Center';
import {styles} from '../Style/styles';

const Register = ({navigation}: AuthProps) => {
  const {loginError: errorMessage, login} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Center>
      <Text style={styles.title}>Hi, welcome back!</Text>
      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>Email / Username:</Text>
          <TextInput
            style={styles.input}
            placeholder="Email / Username"
            onChangeText={(givenEmail) => setEmail(givenEmail)}
          />
        </View>
        <View>
          <Text style={styles.inputTitle}>Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            onChangeText={(givenPassword) => setPassword(givenPassword)}
          />
        </View>
      </View>
      <View>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => login(email, password)}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.inform}>
          New user?{' '}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('Register')}>
            Register
          </Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot Password
        </Text>
      </TouchableOpacity>
    </Center>
  );
};

export default Register;
