import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';
import ImageCropPicker, {Options} from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/AntDesign';

import {windowHeight, windowWidth} from '../../Utils/dimension';
import Center from '../Center/Center';
import {COLOR, globalStyles} from '../Style/styles';

const Upload = () => {
  const [videoPath, setVideoPath] = React.useState<string | null>(null);
  const [modalOpen, setModalOpen] = React.useState<boolean | undefined>(false);

  const videoOptions: Options = {
    compressVideoPreset: 'HighestQuality',
    mediaType: 'video',
  };

  const takeVideo = async () => {
    try {
      const recordedVideo = await ImageCropPicker.openCamera(videoOptions);
      console.log(recordedVideo);
      setVideoPath(recordedVideo.path);
      setModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getVideoFromLibrary = async () => {
    try {
      const pickedVideo = await ImageCropPicker.openPicker(videoOptions);
      console.log(pickedVideo);
      setVideoPath(pickedVideo.path);
      setModalOpen(true);
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

      <Modal visible={modalOpen}>
        <View style={styles.videoContainer}>
          <View style={styles.closeWrapper}>
            <Text style={styles.subTitle}>Preview</Text>
            <Icon name="close" size={24} onPress={() => setModalOpen(false)} />
          </View>
          <View style={styles.videoWrapper}>
            <Video
              source={{uri: videoPath!}}
              style={styles.video}
              controls={true}
              fullscreen={true}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text>Controls</Text>
          </View>
        </View>
      </Modal>
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
  subTitle: {
    fontSize: 18,
  },
  videoContainer: {
    backgroundColor: COLOR.white,
  },
  closeWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  videoWrapper: {
    display: 'flex',
    paddingVertical: 40,
    backgroundColor: COLOR.black,
    maxHeight: windowHeight * 0.8,
  },
  video: {
    width: windowWidth,
    height: windowHeight * 0.6,
    // borderTopColor: COLOR.accentColor,
    // borderBottomColor: COLOR.accentColor,
    // borderWidth: StyleSheet.hairlineWidth,
  },
});
