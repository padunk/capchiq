import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';

import {AuthContext} from '../AuthProvider/AuthProvider';
import {AuthProps} from '../AuthStack/AuthStack';
import Center from '../Center/Center';
import {styles} from '../Style/styles';

const ForgotPassword = ({navigation}: AuthProps) => {
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
            onChangeText={(givenEmail) => setEmail(givenEmail)}
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
