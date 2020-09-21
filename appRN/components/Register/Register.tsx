import React, {useState, useContext} from 'react';
import {Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Center from '../Center/Center';
import {AuthContext} from '../AuthProvider/AuthProvider';
import {AuthProps} from '../AuthStack/AuthStack';
import {globalStyles} from '../Style/styles';

const Register = ({navigation}: AuthProps) => {
  const {registerError: errorMessage, register} = useContext(AuthContext);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Center>
      <Text style={globalStyles.title}>
        {"Hello!\nWe're glad you're joining us."}
      </Text>
      <View style={globalStyles.form}>
        <View style={globalStyles.inputWrapper}>
          <Text style={globalStyles.inputTitle}>Full Name:</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Julia Sho"
            onChangeText={(givenName) => setFullName(givenName)}
          />
        </View>
        <View style={globalStyles.inputWrapper}>
          <Text style={globalStyles.inputTitle}>Email:</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Email"
            onChangeText={(givenEmail) => setEmail(givenEmail)}
          />
        </View>
        <View>
          <Text style={globalStyles.inputTitle}>Password:</Text>
          <TextInput
            style={globalStyles.input}
            secureTextEntry
            placeholder="Password"
            onChangeText={(givenPassword) => setPassword(givenPassword)}
          />
        </View>
      </View>
      <View>
        {errorMessage && <Text style={globalStyles.error}>{errorMessage}</Text>}
      </View>
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => register(fullName, email, password)}>
        <Text style={globalStyles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={globalStyles.inform}>
          Already have an account?{' '}
          <Text
            style={globalStyles.link}
            onPress={() => navigation.navigate('Login')}>
            Log in
          </Text>
        </Text>
      </TouchableOpacity>
    </Center>
  );
};

export default Register;
