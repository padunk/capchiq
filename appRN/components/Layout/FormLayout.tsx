import React from 'react';
import {Keyboard, KeyboardAvoidingView, StatusBar} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const FormLayout = ({children}: any) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default FormLayout;
