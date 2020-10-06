import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import PostBody from './Body';
import PostFooter from './Footer';
import PostHeader from './Header';
import {UserContext} from '../../../Provider/UserProvider';

const Post = (props: any) => {
  const navigation = useNavigation();
  const {setUserID} = useContext(UserContext);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setUserID(props.user.id);
          navigation.navigate('UserDetail');
        }}>
        <PostHeader
          photoURL={props.user.photoURL}
          displayName={props.user.displayName}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('PostDetail')}>
        <PostBody uri={props.video.uri} />
      </TouchableOpacity>
      <PostFooter likeCount={props.video.likeCount} title={props.video.title} />
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({});
