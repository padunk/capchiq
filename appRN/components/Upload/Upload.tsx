import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import ImageCropPicker, {Options, Video} from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import RNFetchBlob from 'rn-fetch-blob';
import {PolyfillBlob} from 'rn-fetch-blob';
import {AuthContext} from '../AuthProvider/AuthProvider';

import Center from '../Center/Center';
import {firebaseStorage} from '../Firebase/Firebase';
import {COLOR, globalStyles} from '../Style/styles';
import VideoPreview from '../Video/VideoPreview';
import * as Progress from 'react-native-progress';
import {saveVideoData} from '../Firebase/firebaseFunc';

const Upload = () => {
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  // @ts-ignore
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  // @ts-ignore
  window.Blob = Blob;

  const {user} = React.useContext(AuthContext);
  const [videoPath, setVideoPath] = React.useState<string | null>(null);
  const [modalOpen, setModalOpen] = React.useState<boolean | undefined>(false);
  const [videoInfo, updateVideoInfo] = React.useState<Video | null>(null);
  const [progress, updateProgress] = React.useState(0);

  const videoOptions: Options = {
    compressVideoPreset: 'HighestQuality',
    mediaType: 'video',
  };

  const takeVideo = async () => {
    console.log('THIS:', this);
    try {
      const recordedVideo = await ImageCropPicker.openCamera(videoOptions);
      console.log(recordedVideo);
      setVideoPath(recordedVideo.path);
      setModalOpen(true);
      updateVideoInfo(recordedVideo);
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
      updateVideoInfo(pickedVideo);
    } catch (error) {
      console.log(error);
    }
  };

  const saveToFirebase = async () => {
    if (videoPath === '' || videoPath === null) {
      return;
    }

    let uploadBlob: PolyfillBlob;
    const fileName: string = videoPath.match(/\w+.mp4/)![0];

    try {
      const ref: firebase.storage.Reference = firebaseStorage
        .ref('Videos/feed/')
        .child(user?.uid! + '/' + fileName);

      const data = await fs.readFile(videoPath, 'base64');
      // @ts-ignore
      const imageBlob: PolyfillBlob = await Blob.build(data, {
        type: `${videoInfo?.mime};BASE64`,
      });
      uploadBlob = imageBlob;
      const uploadTask: firebase.storage.UploadTask = ref.put(imageBlob, {
        contentType: videoInfo?.mime,
      });
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          updateProgress(
            () => (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
        },
        (error) => {
          throw new Error(error.message);
        },
        async () => {
          const url = await uploadTask.snapshot.ref.getDownloadURL();
          console.log('url :>> ', url);
          // saveVideoData();
          uploadBlob.close();
          setModalOpen(false);
          updateProgress(0);
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  // when to call this, when progress is === 100?
  // createAlert('Video uploaded successfully', '');

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
            {progress > 0 && (
              <View style={{height: 10}}>
                <Progress.Bar
                  progress={progress}
                  width={null}
                  color={COLOR.primaryColor}
                  borderRadius={0}
                />
              </View>
            )}
            <View>
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                  },
                  globalStyles.button,
                ]}
                onPress={saveToFirebase}
                disabled={progress > 0}>
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
              </Pressable>
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
