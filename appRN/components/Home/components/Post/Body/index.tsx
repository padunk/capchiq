import React from 'react';
import {StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import {WIDTH} from '../../../../../Utils/CONSTANTS';
import {COLOR} from '../../../../Style/styles';

const PostBody = ({uri}) => {
  const [videoDimension, setVideoDimension] = React.useState({
    width: 0,
    height: 0,
  });

  return (
    <View style={{backgroundColor: COLOR.black}}>
      <Video
        style={{
          width: videoDimension.width,
          height: videoDimension.height,
        }}
        muted
        source={{uri: uri}}
        resizeMode="contain"
        onLoad={(data) => {
          //   console.log('data', data);
          const scale = WIDTH / data.naturalSize.width;
          setVideoDimension((prevState) => {
            return {
              ...prevState,
              width: data.naturalSize.width * scale,
              height: data.naturalSize.height * scale,
            };
          });
        }}
      />
    </View>
  );
};

export default PostBody;

const styles = StyleSheet.create({});
