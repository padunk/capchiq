import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {Formik} from 'formik';

import {capitalizeFirstLetter} from '../../Utils/helpers';
import {AuthContext} from '../AuthProvider/AuthProvider';
import {AuthProps} from '../AuthStack/AuthStack';
import Center from '../Center/Center';
import {globalStyles} from '../Style/styles';
import {ForgotPasswordSchema} from '../../Schema/AuthSchema';

const ForgotPassword = ({navigation}: AuthProps) => {
  const {resetPasswordMessage: message, resetPassword} = useContext(
    AuthContext,
  );

  return (
    <Center>
      <Text style={globalStyles.title}>Forgot your password?</Text>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={(val) => {
          const {email} = val;
          resetPassword(email, navigation.navigate('Login'));
        }}>
        {(props) => (
          <View style={globalStyles.form}>
            <View style={globalStyles.inputWrapper}>
              <Text style={globalStyles.inputTitle}>Email:</Text>
              {props.errors.email ? (
                <Text style={globalStyles.error}>
                  {capitalizeFirstLetter(props.errors.email)}
                </Text>
              ) : null}
              <TextInput
                placeholder="Email"
                onChangeText={props.handleChange('email')}
                value={props.values.email}
                keyboardType="email-address"
                autoCompleteType="email"
                textContentType="emailAddress"
                selectTextOnFocus={true}
                style={globalStyles.input}
              />
            </View>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={props.handleSubmit}>
              <Text style={globalStyles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <View>
        {message && <Text style={globalStyles.error}>{message}</Text>}
      </View>
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
