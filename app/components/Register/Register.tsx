import React, {useState, useContext} from 'react';
import {Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Center from '../Center/Center';
import {AuthContext} from '../AuthProvider/AuthProvider';
import {AuthProps} from '../AuthStack/AuthStack';
import {styles} from '../Style/styles';

const Register = ({navigation}: AuthProps) => {
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
            onChangeText={(givenName) => setFullName(givenName)}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(givenEmail) => setEmail(givenEmail)}
          />
        </View>
        <View>
          <Text style={styles.inputTitle}>Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Password"
            onChangeText={(givenPassword) => setPassword(givenPassword)}
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

export default Register;
