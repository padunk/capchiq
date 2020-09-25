// @ts-check
import React, {useState, useRef} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';

import {COLOR} from '../Style/styles';
import {VideoInfo} from '../Upload/Upload';
import {useOrientation} from '../../Utils/orientation';

const noop = () => {};

interface Props {
  uri: string | null;
  videoInfo: VideoInfo;
}

const VideoPreview = (props: Props) => {
  const videoPlayer = useRef<Video | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const orientation = useOrientation();
  const {height, width} = useWindowDimensions();

  const onSeek = (seek: any) => {
    videoPlayer.current?.seek(seek);
  };

  const onPaused = (playerState: any) => {
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current?.seek(0);
  };

  const onProgress = (data: any) => {
    // Video Player will continue progress even if the video already ended
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data: any) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => {
    // Uncomment this line if you choose repeat=false in the video player
    setPlayerState(PLAYER_STATES.ENDED);
  };

  const onSeeking = (currentTime: any) => setCurrentTime(currentTime);

  return (
    <View style={styles.videoWrapper}>
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={(ref) => (videoPlayer.current = ref)}
        resizeMode="contain"
        source={{uri: props.uri!}}
        repeat
        style={{
          width: width,
          height: height - 200,
        }}
        volume={1.0}
      />
      <MediaControls
        duration={duration}
        onPaused={onPaused}
        onSeek={onSeek}
        onSeeking={onSeeking}
        onReplay={onReplay}
        playerState={playerState}
        progress={currentTime}
        mainColor={COLOR.primaryColor}
        showOnStart={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  videoWrapper: {
    backgroundColor: COLOR.black,
    paddingVertical: 20,
  },
});

export default VideoPreview;
