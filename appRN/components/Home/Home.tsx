import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import HomeHeader from './components/HomeHeader';
import {AuthContext} from '../AuthProvider/AuthProvider';
import {BottomTabProps} from '../AppTab/AppTab';
import {COLOR, globalStyles} from '../Style/styles';
import {firebaseDatabase} from '../Firebase/Firebase';
import Post from './components/Post';
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
      try {
        // get followID
        const followIdolID = await firebaseDatabase
          .ref('/follows/' + user?.uid)
          .child('followID')
          .limitToFirst(20)
          .once('value');
        // turn it into an array ['id-1', 'id-2', ...]
        const followIdolArray: string[] = Object.entries(followIdolID.val())
          .filter((ar) => ar[1])
          .map((id) => id[0]);

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
      } catch (error) {
        console.log('getContentsError :>> ', error);
      }
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
            ListFooterComponent={() => <View style={{marginBottom: 70}} />}
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
