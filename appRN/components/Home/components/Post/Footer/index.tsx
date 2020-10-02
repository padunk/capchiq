import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const PostFooter = ({likeCount, title}) => {
  return (
    <View style={styles.wrapper}>
      <Text>{title}</Text>
      <SimpleLineIcons name="fire" size={16} color="red" />
      <Text style={styles.footer}>{likeCount}</Text>
    </View>
  );
};

export default PostFooter;

const styles = StyleSheet.create({
  wrapper: {
    padding: 8,
  },
  footer: {
    fontSize: 16,
  },
});
