import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';

import {AuthContext} from '../AuthProvider/AuthProvider';
import Center from '../Center/Center';

const ForgotPassword = ({navigation}) => {
  const {resetPasswordMessage: message, resetPassword} = useContext(
    AuthContext,
  );
  const [email, setEmail] = useState('');

  return (
    <Center>
      <Text style={styles.title}>Forgot your password?</Text>
      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>Email:</Text>
          <TextInput
            style={styles.input}
            onChangeText={givenEmail => setEmail(givenEmail)}
          />
        </View>
      </View>
      <View>{message && <Text style={styles.error}>{message}</Text>}</View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => resetPassword(email, navigation.navigate('Login'))}>
        <Text style={styles.buttonText}>Reset Password</Text>
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

export default ForgotPassword;

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
