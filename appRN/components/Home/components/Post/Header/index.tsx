import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {UserPublicData} from '../../../../../Types/types';

type IPostHeader = {
  user: UserPublicData;
};

const PostHeader: React.FC<IPostHeader> = ({user}) => {
  const {displayName, photoURL} = user;

  return (
    <View style={styles.wrapper}>
      {photoURL === null || photoURL === '' ? (
        <IonIcons name="person-circle" size={20} />
      ) : (
        <Image source={{uri: photoURL}} style={{width: 24, height: 24}} />
      )}
      <Text style={styles.name}>{displayName}</Text>
    </View>
  );
};

export default PostHeader;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingVertical: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 4,
  },
});
