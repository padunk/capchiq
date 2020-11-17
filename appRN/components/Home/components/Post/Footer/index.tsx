import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

type IPostFooterProps = {
  likeCount: number;
  title: string;
};

const PostFooter: React.FC<IPostFooterProps> = ({likeCount, title}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.videoInfoBar}>
        <SimpleLineIcons name="fire" size={20} color="red" />
        <Text style={styles.likeCount}>{likeCount}</Text>
      </View>
      <Text style={styles.textFooter}>{title} - Awesome</Text>
    </View>
  );
};

export default PostFooter;

const styles = StyleSheet.create({
  wrapper: {
    padding: 8,
  },
  videoInfoBar: {
    display: 'flex',
    flexDirection: 'row',
  },
  likeCount: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  textFooter: {
    fontSize: 16,
  },
});
