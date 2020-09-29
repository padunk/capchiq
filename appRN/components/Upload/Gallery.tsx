import CameraRoll from '@react-native-community/cameraroll';
import React from 'react';
import {
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ImageCropPicker, {Options} from 'react-native-image-crop-picker';
import Video from 'react-native-video';

import {AuthContext} from '../AuthProvider/AuthProvider';

const videoOptions: Options = {
  compressVideoPreset: 'HighestQuality',
  mediaType: 'video',
};

const Gallery = () => {
  const [galleryVideos, updateGalleryVideos] = React.useState<
    CameraRoll.PhotoIdentifier[] | null
  >(null);

  React.useEffect(() => {
    async function hasAndroidPermission() {
      const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

      const hasPermission = await PermissionsAndroid.check(permission);
      if (hasPermission) {
        return true;
      }

      const status = await PermissionsAndroid.request(permission);
      return status === 'granted';
    }

    async function getMedia() {
      if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
        return;
      }
      CameraRoll.getPhotos({
        first: 20,
        assetType: 'Videos',
      })
        .then((data) => {
          console.log(data.edges[0].node);
          updateGalleryVideos(data.edges);
        })
        .catch((err) => console.log(err));
    }

    getMedia();
  }, []);

  return (
    <View>
      <ScrollView>
        {galleryVideos !== null &&
          galleryVideos.length > 0 &&
          galleryVideos.map((p, i) => {
            return (
              <Video
                key={p.node.timestamp}
                style={{
                  width: 300,
                  height: 300,
                  borderColor: 'red',
                  borderWidth: 2,
                }}
                source={{uri: p.node.image.uri}}
                resizeMode="contain"
                repeat
              />
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({});
