import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ListRenderItemInfo,
  useWindowDimensions,
  ScrollView,
  VirtualizedList,
  Platform,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Video from 'react-native-video';

import Spacer from '../Spacer/Spacer';
import HomeHeader from './components/HomeHeader';
import {AuthContext} from '../AuthProvider/AuthProvider';
import {BottomTabProps} from '../AppTab/AppTab';
import {COLOR, globalStyles} from '../Style/styles';
import {firebaseDatabase} from '../Firebase/Firebase';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {HEIGHT, WIDTH} from '../../Utils/CONSTANTS';
import VideoPreview from '../Video/VideoPreview';
import Post from './components/Post';
import {clockRunning} from 'react-native-reanimated';
import Loading from '../Loading/Loading';

type User = {
  createdAt: number;
  displayName: string;
  fansCount: number;
  idolsCount: number;
  photoURL: string | null;
  updatedAt: number;
};

type Video = {
  likeCount: number;
  timestamp: number;
  title: string | null;
  uri: string;
};

interface IIdolVideoPost {
  user: User;
  video: Video;
}

const Home = ({navigation}: BottomTabProps) => {
  const {user} = useContext(AuthContext);
  const [videoFeeds, updateVideoFeeds] = useState<IIdolVideoPost[]>([]);

  useEffect(() => {
    async function getContents() {
      // get followID
      const followIdolID = await firebaseDatabase
        .ref('/follows/' + user?.uid)
        .child('followID')
        .limitToFirst(20)
        .once('value');
      // turn it into an array ['id-1', 'id-2', ...]
      const followIdolArray: string[] = Array.from(followIdolID.val());

      // get idols public data
      const followIdolData = followIdolArray.map((idol: string) => {
        return firebaseDatabase
          .ref('/users/' + idol)
          .child('public')
          .once('value');
      });
      const idolSnapshots: firebase.database.DataSnapshot[] = await Promise.all(
        followIdolData,
      );

      // get two newest videos from idols
      const followIdolVideos = followIdolArray.map((idol: string) => {
        return firebaseDatabase
          .ref('/videos/')
          .child(idol)
          .orderByChild('timestamp')
          .limitToLast(1)
          .once('value');
      });
      const videoSnapshots: firebase.database.DataSnapshot[] = await Promise.all(
        followIdolVideos,
      );

      let result: IIdolVideoPost[] = [];
      idolSnapshots.forEach((idol, idx) => {
        const videoObj = videoSnapshots[idx].val();
        const videoKey = Object.keys(videoObj)[0];
        const video = videoObj[videoKey!];

        result.push({user: idol.val(), video});
      });

      console.log('result :>> ', result);
      updateVideoFeeds(result);
    }

    getContents();
  }, []);

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <HomeHeader />
      </View>
      <View>
        {videoFeeds.length > 0 ? (
          <FlatList
            data={videoFeeds}
            renderItem={({item}) => <Post {...item} />}
            keyExtractor={(item: any) => item.user.displayName}
            ItemSeparatorComponent={
              class Test extends React.Component {
                render() {
                  return (
                    <View style={{marginTop: 16, marginBottom: 8}}>
                      <View
                        style={{height: 1, backgroundColor: COLOR.grayColor}}
                      />
                    </View>
                  );
                }
              }
            }
          />
        ) : (
          <Loading />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLOR.primaryColor,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default Home;
