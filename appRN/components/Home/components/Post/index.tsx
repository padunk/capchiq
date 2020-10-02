import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PostBody from './Body';
import PostFooter from './Footer';
import PostHeader from './Header';

const Post = (props) => {
  return (
    <View>
      <PostHeader
        photoURL={props.user.photoURL}
        displayName={props.user.displayName}
      />
      <PostBody uri={props.video.uri} />
      <PostFooter likeCount={props.video.likeCount} title={props.video.title} />
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({});
