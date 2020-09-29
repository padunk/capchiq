import React from 'react';
import {Button, Modal, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import UploadModal from './UploadModal';

const ModalStack = createStackNavigator();

const UploadForm = ({navigation}: any) => {
  return (
    <View>
      <Text>UPLOADING</Text>
      <Button title="back" onPress={() => navigation.goBack()} />
      <Button
        title="to form"
        onPress={() => navigation.navigate('Video Form')}
      />
    </View>
  );
};

const VideoForm = ({navigation}: any) => {
  return (
    <View>
      <Text>FORM of video title, etc</Text>
      <Button title="back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const UploadFile = () => {
  return (
    <ModalStack.Navigator>
      <ModalStack.Screen name="Upload Video" component={UploadForm} />
      <ModalStack.Screen name="Video Form" component={VideoForm} />
    </ModalStack.Navigator>
  );
};

export default UploadFile;

const styles = StyleSheet.create({});
