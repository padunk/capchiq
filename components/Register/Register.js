import React, {useState, useContext} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Center from '../Center/Center';
import {AuthContext} from '../AuthProvider/AuthProvider';

const Register = ({navigation}) => {
  const {registerError: errorMessage, register} = useContext(AuthContext);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Center>
      <Text style={styles.title}>
        {"Hello!\nWe're glad you're joining us."}
      </Text>
      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>Full Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Julia Sho"
            onChangeText={givenName => setFullName(givenName)}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={givenEmail => setEmail(givenEmail)}
          />
        </View>
        <View>
          <Text style={styles.inputTitle}>Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Password"
            onChangeText={givenPassword => setPassword(givenPassword)}
          />
        </View>
      </View>
      <View>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => register(fullName, email, password)}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.inform}>
          Already have an account?{' '}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('Login')}>
            Log in
          </Text>
        </Text>
      </TouchableOpacity>
    </Center>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    color: '#2865D6',
    textAlign: 'center',
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
    backgroundColor: '#CB6BD6',
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
