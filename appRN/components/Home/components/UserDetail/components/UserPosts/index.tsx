import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Video from 'react-native-video';
import {WIDTH} from '../../../../../../Utils/CONSTANTS';
import {firebaseDatabase} from '../../../../../Firebase/Firebase';
import {COLOR} from '../../../../../Style/styles';

const UserPosts = ({userData}) => {
  const [postContents, updatePostContents] = useState<any[] | null>(null);

  useEffect(() => {
    async function getPosts(id: string) {
      const videosSnapshot: firebase.database.DataSnapshot = await firebaseDatabase
        .ref('/videos/' + id)
        .limitToFirst(24)
        .once('value');

      const videosObject = videosSnapshot.val();

      let result = [];
      for (const video in videosObject) {
        if (Object.prototype.hasOwnProperty.call(videosObject, video)) {
          const element = videosObject[video];
          result.push(element);
        }
      }
      // testing
      for (let i = 0; i < 23; i++) {
        let clone = Object.assign({}, JSON.parse(JSON.stringify(result[0])), {
          timestamp: i,
        });
        result.push(result[0]);
      }

      updatePostContents(result);
    }

    getPosts(userData.id);
  }, []);

  const renderPosts = ({item}) => {
    return (
      <TouchableOpacity onPress={() => console.log('post detail')}>
        <Video
          source={require('../../../../../../assets/videos/50-beaches.mp4')}
          style={{
            width: WIDTH / 3,
            height: WIDTH / 3,
            backgroundColor: COLOR.black,
          }}
          paused
          muted
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      {postContents === null ? (
        <ActivityIndicator size="large" />
      ) : postContents.length === 0 ? (
        <View>
          <Text>No contents found</Text>
        </View>
      ) : (
        <FlatList
          data={postContents}
          renderItem={renderPosts}
          keyExtractor={(item) => item.timestamp}
          numColumns={3}
          horizontal={false}
        />
      )}
    </>
  );
};

export default UserPosts;

const styles = StyleSheet.create({});
