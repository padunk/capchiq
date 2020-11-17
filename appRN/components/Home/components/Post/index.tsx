import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import PostBody from './Body';
import PostFooter from './Footer';
import PostHeader from './Header';
import {UserContext} from '../../../Provider/UserProvider';
import {UserPublicData, VideoData} from '../../../../Types/types';
import {VideoContext} from '../../../Provider/VideoProvider';

type IPostProps = {
  user: UserPublicData;
  video: VideoData;
};

const Post: React.FC<IPostProps> = ({user, video}) => {
  const navigation = useNavigation();
  const {setUserID} = useContext(UserContext);
  const {setvideoDetail} = useContext(VideoContext);

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
          setvideoDetail(video);
          navigation.navigate('PostDetail');
        }}>
        <PostBody uri={video.uri} />
      </TouchableOpacity>
      <PostFooter likeCount={video.likeCount} title={video.title} />
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({});
