import React, {useState} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import ImagePicker, {ImagePickerOptions} from 'react-native-image-picker';
import Center from '../Center/Center';
import {styles} from '../Style/styles';

const Upload = () => {
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
    <Center>
      <View>
        <View>
          <Text>Share your best content.</Text>
        </View>
        <View>
          <TouchableOpacity onPress={selectVideoTapped} style={styles.button}>
            <Text style={styles.buttonText}>Select a Video</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>{videoSource}</Text>
        </View>
      </View>
    </Center>
  );
};

export default Upload;
