import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';

import {AuthContext} from '../AuthProvider/AuthProvider';
import {AuthProps} from '../AuthStack/AuthStack';
import Center from '../Center/Center';
import {globalStyles} from '../Style/styles';

const ForgotPassword = ({navigation}: AuthProps) => {
  const {resetPasswordMessage: message, resetPassword} = useContext(
    AuthContext,
  );
  const [email, setEmail] = useState('');

  return (
    <Center>
      <Text style={globalStyles.title}>Forgot your password?</Text>
      <View style={globalStyles.form}>
        <View style={globalStyles.inputWrapper}>
          <Text style={globalStyles.inputTitle}>Email:</Text>
          <TextInput
            style={globalStyles.input}
            onChangeText={(givenEmail) => setEmail(givenEmail)}
          />
        </View>
      </View>
      <View>
        {message && <Text style={globalStyles.error}>{message}</Text>}
      </View>
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => resetPassword(email, navigation.navigate('Login'))}>
        <Text style={globalStyles.buttonText}>Reset Password</Text>
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

export default ForgotPassword;
