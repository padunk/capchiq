import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker, {ImagePickerOptions} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';

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
      <Text style={styles.title}>Share your best talent!</Text>
      <View>
        <TouchableOpacity onPress={selectVideoTapped} style={styles.button}>
          <Text style={styles.buttonText}>
            <Icon name="upload" size={24} />
            {'  '}Upload Video
          </Text>
        </TouchableOpacity>
        <Text style={{margin: 8, textAlign: 'center'}}>{videoSource}</Text>
      </View>
    </Center>
  );
};

export default Upload;
