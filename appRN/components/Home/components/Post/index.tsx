import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import PostBody from './Body';
import PostFooter from './Footer';
import PostHeader from './Header';
import {UserContext} from '../../../Provider/UserProvider';
import {UserPublicData, VideoData} from '../../../../Types/types';
import {useDispatch} from 'react-redux';
import {videoSlice} from '../../../../redux/slice';

type IPostProps = {
  user: UserPublicData;
  video: VideoData;
};

const Post: React.FC<IPostProps> = ({user, video}) => {
  const navigation = useNavigation();
  const {setUserID} = useContext(UserContext);
  const dispatch = useDispatch();
  const {fetchVideoDetail} = videoSlice.actions;

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setUserID(user.id);
          navigation.navigate('UserDetail');
        }}>
        <PostHeader user={user} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setUserID(user.id);
          dispatch(fetchVideoDetail(video));
          navigation.navigate('PostDetail');
        }}>
        <PostBody uri={video.uri} />
      </TouchableOpacity>
      <PostFooter
        videoID={video.videoID}
        likeCount={video.likeCount}
        title={video.title}
      />
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({});
