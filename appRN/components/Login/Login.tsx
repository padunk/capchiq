import React, {useState, useContext} from 'react';
import {Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Octicons';

import {AuthContext} from '../AuthProvider/AuthProvider';
import {AuthProps} from '../AuthStack/AuthStack';
import Center from '../Center/Center';
import {globalStyles} from '../Style/styles';
import {Formik} from 'formik';
import {LoginSchema} from '../../Schema/AuthSchema';
import {capitalizeFirstLetter} from '../../Utils/helpers';

const Login = ({navigation}: AuthProps) => {
  const {loginError: errorMessage, login} = useContext(AuthContext);
  const [secure, updateSecure] = useState<boolean>(true);

  return (
    <Center>
      <Text style={globalStyles.title}>Hi, welcome back!</Text>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={(val) => {
          const {email, password} = val;
          login(email, password);
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
            <View style={globalStyles.inputWrapper}>
              <Text style={globalStyles.inputTitle}>Password:</Text>
              <View style={{position: 'relative'}}>
                <TextInput
                  placeholder="Password"
                  onChangeText={props.handleChange('password')}
                  value={props.values.password}
                  secureTextEntry={secure}
                  autoCompleteType="password"
                  textContentType="password"
                  selectTextOnFocus={true}
                  style={globalStyles.input}
                />
                <Icon
                  style={{position: 'absolute', right: 0, bottom: 11}}
                  name={secure ? 'eye' : 'eye-closed'}
                  size={18}
                  color="gray"
                  onPress={() => updateSecure(!secure)}
                />
              </View>
            </View>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={props.handleSubmit}>
              <Text style={globalStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <View>
        {errorMessage && <Text style={globalStyles.error}>{errorMessage}</Text>}
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
        <Text
          style={globalStyles.link}
          onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot Password
        </Text>
      </TouchableOpacity>
    </Center>
  );
};

export default Login;
