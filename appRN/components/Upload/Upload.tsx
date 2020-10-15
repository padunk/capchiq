import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import ImageCropPicker, {Options, Video} from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {PolyfillBlob} from 'rn-fetch-blob';

import {AuthContext} from '../AuthProvider/AuthProvider';
import Center from '../Center/Center';
import {firebaseStorage} from '../Firebase/Firebase';
import {COLOR, globalStyles} from '../Style/styles';
import {saveVideoData} from '../Firebase/firebaseFunc';
import UploadModal from './UploadModal';
import {BottomTabProps} from '../AppTab/AppTab';
import AlertComponent from '../Alert/Alert';

const Upload = ({navigation}: BottomTabProps) => {
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
    try {
      const recordedVideo = await ImageCropPicker.openCamera(videoOptions);
      // console.log(recordedVideo);
      setVideoPath(recordedVideo.path);
      setModalOpen(true);
      updateVideoInfo(recordedVideo);
    } catch (error) {
      AlertComponent({
        title: 'Error taking videos.',
        msg: error,
        buttons: [{text: 'OK', onPress: () => {}}],
        options: {cancelable: true},
      });
    }
  };

  const getVideoFromLibrary = async () => {
    try {
      const pickedVideo = await ImageCropPicker.openPicker(videoOptions);
      // console.log(pickedVideo);
      setVideoPath(pickedVideo.path);
      setModalOpen(true);
      updateVideoInfo(pickedVideo);
    } catch (error) {
      AlertComponent({
        title: 'Error getting videos.',
        msg: error,
        buttons: [{text: 'OK', onPress: () => {}}],
        options: {cancelable: true},
      });
    }
  };

  const saveToFirebase = async () => {
    if (videoPath === '' || videoPath === null) {
      return;
    }

    let uploadBlob: PolyfillBlob;
    const fileName: string = videoPath.match(/\w+(?=.mp4)/)![0];
    const extension: string = '.' + videoPath.match(/\w+$/)![0];

    try {
      const ref: firebase.storage.Reference = firebaseStorage
        .ref('Videos/feed/')
        .child(user?.uid! + '/' + fileName + extension);

      const data = await fs.readFile(videoPath, 'base64');
      // @ts-ignore Blob doesn't implicitly have build method. check it again
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
          // on progress
          updateProgress(
            () => (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
        },
        (error) => {
          // on error
          throw new Error(error.message);
        },
        async () => {
          // on complete
          const url = await uploadTask.snapshot.ref.getDownloadURL();
          saveVideoData(fileName, user!.uid, url);

          uploadBlob.close();
          setModalOpen(false);
          updateProgress(0);
          // @ts-ignore idk why it didn't recognize navigate
          navigation.navigate('Home');
          AlertComponent({
            title: 'Upload Success',
            msg: '',
            buttons: [{text: 'OK', onPress: () => {}}],
            options: {cancelable: true},
          });
        },
      );
    } catch (error) {
      AlertComponent({
        title: 'Upload Error',
        msg: error,
        buttons: [{text: 'OK', onPress: () => {}}],
        options: {cancelable: true},
      });
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
          <Text style={[globalStyles.buttonText, styles.buttonText]}>
            Take Video
          </Text>
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

      <UploadModal
        modalOpen={modalOpen}
        videoPath={videoPath}
        videoInfo={videoInfo}
        setModalOpen={setModalOpen}
        progress={progress}
        saveToFirebase={saveToFirebase}
      />
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
    color: COLOR.white,
  },
});
