/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.wrapper}>
        <View>
          <Text>ENTER</Text>
        </View>
        <View>
          <TextInput placeholder="Your name" />
          <TextInput placeholder="Email" />
        </View>
        <Text>Forgot password?</Text>
        <View>
          <Button title="ENTER" />
        </View>
        <Text>Register</Text>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
