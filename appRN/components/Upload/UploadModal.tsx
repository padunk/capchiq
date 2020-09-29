import React from 'react';
import {
  GestureResponderEvent,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {COLOR, globalStyles} from '../Style/styles';
import VideoPreview from '../Video/VideoPreview';
import * as Progress from 'react-native-progress';
import {Video} from 'react-native-image-crop-picker';

interface VideoModalProps {
  modalOpen: boolean | undefined;
  videoPath: string | null;
  videoInfo: Video | null;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  progress: number;
  saveToFirebase: (event: GestureResponderEvent) => void;
}

const UploadModal = ({
  modalOpen,
  videoPath,
  videoInfo,
  setModalOpen,
  progress,
  saveToFirebase,
}: VideoModalProps) => {
  return (
    <Modal visible={modalOpen}>
      <View style={styles.videoContainer}>
        <View style={styles.closeWrapper}>
          <Text style={styles.subTitle}>Preview</Text>
          <Icon name="close" size={24} onPress={() => setModalOpen(false)} />
        </View>
        <View>
          <VideoPreview uri={videoPath} />
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
  );
};

export default UploadModal;

const styles = StyleSheet.create({
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
