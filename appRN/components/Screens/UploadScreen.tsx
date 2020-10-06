import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Upload from '../Upload/Upload';
import UploadFile from '../Upload/UploadFile';
import Gallery from '../Upload/Gallery';

const UploadStack = createMaterialTopTabNavigator();

const UploadHome = ({navigation}: any) => {
  return (
    <View>
      <Text>Upload Home</Text>
      <Button
        title="upload file"
        onPress={() => navigation.navigate('Upload Form')}
      />
    </View>
  );
};

const UploadScreen = () => {
  return (
    <UploadStack.Navigator>
      <UploadStack.Screen
        name="Upload Home"
        component={Gallery}
        options={{tabBarLabel: 'Gallery'}}
      />
      <UploadStack.Screen
        name="Upload Form"
        component={UploadFile}
        options={{tabBarLabel: 'Video'}}
      />
    </UploadStack.Navigator>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({});
