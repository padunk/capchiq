import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import ImageCropPicker, {Options} from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import Center from '../Center/Center';
import {COLOR, globalStyles} from '../Style/styles';

const Upload = () => {
  const [videoURI, setVideoURI] = React.useState<string | null>(null);

  const videoOptions: Options = {
    compressVideoPreset: 'HighestQuality',
    mediaType: 'video',
  };

  const takeVideo = async () => {
    try {
      const recordedVideo = await ImageCropPicker.openCamera(videoOptions);
      console.log(recordedVideo);
      setVideoURI(recordedVideo.path);
    } catch (error) {
      console.log(error);
    }
  };

  const getVideoFromLibrary = async () => {
    try {
      const pickedVideo = await ImageCropPicker.openPicker(videoOptions);
      console.log(pickedVideo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Center>
      <View>
        <Text style={globalStyles.title}>Share your best content</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={takeVideo}
          style={[globalStyles.button, styles.button]}>
          <Text style={globalStyles.buttonText}>Take Video</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={getVideoFromLibrary}
          style={globalStyles.button}>
          <Text style={[globalStyles.buttonText, styles.buttonText]}>
            Choose Video from library
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        {videoURI && <Video source={{uri: videoURI}} style={styles.video} />}
      </View>
      <View>{videoURI && <Text>{videoURI}</Text>}</View>
    </Center>
  );
};

export default Upload;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR.primaryColor,
  },
  buttonText: {
    fontSize: 16,
  },
  video: {
    position: 'absolute',
    width: 600,
    height: 600,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
