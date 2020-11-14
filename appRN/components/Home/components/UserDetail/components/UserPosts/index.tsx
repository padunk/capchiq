import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {createThumbnail} from 'react-native-create-thumbnail';
import Video from 'react-native-video';

import {WIDTH} from '../../../../../../Utils/CONSTANTS';
import {firebaseDatabase} from '../../../../../Firebase/Firebase';
import {COLOR} from '../../../../../Style/styles';

const UserPosts = ({userData}) => {
  const navigator = useNavigation();
  const [postContents, updatePostContents] = useState<any[] | null>(null);

  useEffect(() => {
    async function getPosts(id: string) {
      try {
        const videosSnapshot: firebase.database.DataSnapshot = await firebaseDatabase
          .ref('/videos/' + id)
          .limitToFirst(24)
          .once('value');

        const videosObject = videosSnapshot.val();

        let result = [];
        for (const video in videosObject) {
          if (Object.prototype.hasOwnProperty.call(videosObject, video)) {
            const element = videosObject[video];

            // add video poster
            // element.poster = await createThumbnail({
            //   // url: element.uri,
            //   url: '../../../../../../assets/videos/50-beaches.mp4',
            //   timeStamp: 1000,
            // });
            // console.log('element :>> ', element);
            result.push(element);
          }
        }
        // testing
        // for (let i = 0; i < 11; i++) {
        //   let clone = Object.assign({}, JSON.parse(JSON.stringify(result[0])), {
        //     timestamp: i,
        //   });
        //   result.push(clone);
        // }

        updatePostContents(result);
      } catch (error) {
        console.log('Error loading posts :>> ', error);
      }
    }

    getPosts(userData.id);
  }, []);

  const videoPlayer = useRef<Video | null>(null);
  const renderPosts = ({item}: any) => {
    return (
      <Pressable onPress={() => navigator.navigate('PostDetail')}>
        <Video
          // source={{uri: item.uri}}
          source={require('../../../../../../assets/videos/50-beaches.mp4')}
          style={{
            width: WIDTH / 3,
            height: WIDTH / 3,
            backgroundColor: COLOR.black,
          }}
          ref={(ref) => (videoPlayer.current = ref)}
          muted
          paused
          // poster={item.poster.path}
          posterResizeMode="contain"
          resizeMode="contain"
        />
      </Pressable>
    );
  };

  return (
    <View>
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
    </View>
  );
};

export default UserPosts;

const styles = StyleSheet.create({});
