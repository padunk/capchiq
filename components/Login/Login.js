import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as firebase from 'firebase';

import Center from '../Center/Center';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => setErrorMessage(error.message));
  };

  return (
    <Center>
      <Text style={styles.title}>Hi, welcome back!</Text>
      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Email / Username"
            onChangeText={givenEmail => setEmail(givenEmail)}
          />
        </View>
        <View>
          <Text
            style={styles.inputTitle}
            onChangeText={givenPassword => setPassword(givenPassword)}>
            Password:
          </Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Password"
          />
        </View>
      </View>
      <View>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
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
    </Center>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: '#2865D6',
    marginBottom: 30,
  },
  form: {
    marginHorizontal: 40,
    width: '100%',
    paddingLeft: 40,
    paddingRight: 40,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputTitle: {
    color: '#8560EB',
    fontSize: 14,
    textTransform: 'uppercase',
    width: '100%',
  },
  input: {
    borderBottomColor: '#F59FA2',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 18,
  },
  button: {
    height: 55,
    marginHorizontal: 30,
    marginBottom: 20,
    backgroundColor: '#2865D6',
    marginTop: 20,
    padding: 10,
    paddingLeft: 70,
    paddingRight: 70,
    fontSize: 24,
    borderRadius: 50,
  },
  buttonText: {
    color: '#efefef',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.34,
  },
  error: {
    color: '#CB6BD6',
    fontSize: 16,
    marginTop: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  link: {
    color: '#2865D6',
  },
  inform: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Register;
