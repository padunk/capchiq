import React, {useState, useContext} from 'react';
import {Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Octicons';

import Center from '../Center/Center';
import {AuthContext} from '../AuthProvider/AuthProvider';
import {AuthProps} from '../AuthStack/AuthStack';
import {globalStyles} from '../Style/styles';
import {Formik} from 'formik';
import {RegisterSchema} from '../../Schema/AuthSchema';
import {capitalizeFirstLetter} from '../../Utils/helpers';

const Register = ({navigation}: AuthProps) => {
  const {registerError: errorMessage, register} = useContext(AuthContext);
  const [secure, updateSecure] = useState<boolean>(true);

  return (
    <Center>
      <Text style={globalStyles.title}>Register Form</Text>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={(val, actions) => {
          const {email, name, password} = val;
          register(name, email, password);
          actions.resetForm();
        }}>
        {(props) => (
          <View style={globalStyles.form}>
            <View style={globalStyles.inputWrapper}>
              <Text style={globalStyles.inputTitle}>Full Name:</Text>
              {props.errors.name ? (
                <Text style={globalStyles.error}>
                  {capitalizeFirstLetter(props.errors.name)}
                </Text>
              ) : null}
              <TextInput
                placeholder="Name"
                onChangeText={props.handleChange('name')}
                value={props.values.name}
                keyboardType="default"
                autoCompleteType="name"
                textContentType="name"
                selectTextOnFocus={true}
                style={globalStyles.input}
              />
            </View>
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
              {props.errors.password ? (
                <Text style={globalStyles.error}>
                  {capitalizeFirstLetter(props.errors.password)}
                </Text>
              ) : null}
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
              <Text style={globalStyles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <View>
        {errorMessage && <Text style={globalStyles.error}>{errorMessage}</Text>}
      </View>

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
