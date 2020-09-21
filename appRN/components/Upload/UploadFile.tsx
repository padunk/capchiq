import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import ImagePicker, {ImagePickerOptions} from 'react-native-image-picker';

const UploadFile = () => {
  const [videoSource, setVideoSource] = useState('');

  const selectVideoTapped = () => {
    const options: ImagePickerOptions = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium',
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setVideoSource(response.uri);
      }
    });
  };

  return (
    <View>
      <Text>UploadFiles</Text>
      <TouchableOpacity onPress={selectVideoTapped}>
        <View style={[styles.avatar, styles.avatarContainer]}>
          <Text>Select a Video</Text>
        </View>
      </TouchableOpacity>
      <Text style={{margin: 8, textAlign: 'center'}}>{videoSource}</Text>
    </View>
  );
};

export default UploadFile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
});
