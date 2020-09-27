import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ProgressBarAndroid,
} from 'react-native';
import ImageCropPicker, {Options} from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import RNFetchBlob from 'rn-fetch-blob';
import {PolyfillBlob} from 'rn-fetch-blob';
import {AuthContext} from '../AuthProvider/AuthProvider';

import Center from '../Center/Center';
import {firebaseDatabase, firebaseStorage} from '../Firebase/Firebase';
import {COLOR, globalStyles} from '../Style/styles';
import VideoPreview from '../Video/VideoPreview';
import * as Progress from 'react-native-progress';

export interface VideoInfo {
  width: number | undefined;
  height: number | undefined;
  duration: number | undefined;
}

const Upload = () => {
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;

  const {user} = React.useContext(AuthContext);
  const [videoPath, setVideoPath] = React.useState<string | null>(null);
  const [modalOpen, setModalOpen] = React.useState<boolean | undefined>(false);
  const [videoInfo, updateVideoInfo] = React.useState<VideoInfo>({
    width: undefined,
    height: undefined,
    duration: undefined,
  });
  const [progress, updateProgress] = React.useState(0);

  const videoOptions: Options = {
    compressVideoPreset: 'HighestQuality',
    mediaType: 'video',
  };

  const takeVideo = async () => {
    console.log(this);
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
    console.dir(this);
    try {
      const pickedVideo = await ImageCropPicker.openPicker(videoOptions);
      console.log(pickedVideo);
      setVideoPath(pickedVideo.path);
      setModalOpen(true);
      updateVideoInfo({
        width: pickedVideo.width,
        height: pickedVideo.height,
        duration: pickedVideo.duration!,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const saveToFirebase = async () => {
    if (videoPath === '' || videoPath === null) {
      return;
    }

    let uploadBlob: PolyfillBlob;

    try {
      const fileName: string = videoPath.match(/\w+.mp4/)![0];
      const ref = firebaseStorage.ref('Videos/feed/' + user?.uid! + '/');
      const imageBlob = await Blob.build(videoPath, {type: `video/mp4`});
      uploadBlob = imageBlob;
      const uploadTask: firebase.storage.UploadTask = ref.put(imageBlob, {
        contentType: 'video/mp4',
      });
      uploadTask.on('state_changed', (snapshot) => {
        updateProgress(() =>
          Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
        );
      });
      uploadBlob.close();
      const url = await ref.getDownloadURL();
    } catch (error) {
      console.error(error);
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
          <View>
            <VideoPreview uri={videoPath} videoInfo={videoInfo} />
          </View>
          <View>
            <View>
              <Progress.Bar progress={progress} width={null} />
            </View>
            <View>
              <TouchableOpacity
                style={globalStyles.button}
                onPress={saveToFirebase}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="upload"
                    size={18}
                    color={COLOR.grayColor}
                    style={{paddingRight: 10}}
                  />
                  <Text style={globalStyles.buttonText}>Upload</Text>
                </View>
              </TouchableOpacity>
            </View>
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
});
