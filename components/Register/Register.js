import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

import Center from '../Center/Center';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Register = () => {
  return (
    <Center>
      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>Name:</Text>
          <TextInput style={styles.input} placeholder="Julia Sho" />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>Email:</Text>
          <TextInput style={styles.input} placeholder="Email" />
        </View>
        <View>
          <Text style={styles.inputTitle}>Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Password"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.account}>
          Already have an account? <Text style={styles.link}>Log in</Text>
        </Text>
      </TouchableOpacity>
    </Center>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 12,
    textTransform: 'uppercase',
    width: '100%',
  },
  input: {
    borderBottomColor: '#F59FA2',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 18,
    color: '#F59FA2',
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
  link: {
    color: '#2865D6',
  },
  account: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Register;
