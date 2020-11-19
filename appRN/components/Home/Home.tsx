import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';

import {AuthContext} from '../AuthProvider/AuthProvider';
import {BottomTabProps} from '../AppTab/AppTab';
import {COLOR, globalStyles} from '../Style/styles';
import HomeHeader from './components/HomeHeader';
import Post from './components/Post';
import Loading from '../Loading/Loading';
import Separator from './components/Separator';
import {useDispatch, useSelector} from 'react-redux';
import {getAllVideos, selectVideoData} from '../../redux/slice';

const Home = ({navigation}: BottomTabProps) => {
  const {user} = useContext(AuthContext);
  const {videos: videoFeeds} = useSelector(selectVideoData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.public.id) {
      dispatch(getAllVideos(user?.public.id));
    }
  }, []);

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <HomeHeader />
      </View>
      <View>
        {videoFeeds !== undefined && videoFeeds.length > 0 ? (
          <FlatList
            data={videoFeeds}
            renderItem={({item}) => <Post {...item} />}
            keyExtractor={(item: any) => item.user.displayName}
            ItemSeparatorComponent={Separator}
            ListFooterComponent={() => <View style={{marginBottom: 70}} />}
          />
        ) : videoFeeds !== undefined && videoFeeds.length === 0 ? (
          <View style={globalStyles.container}>
            <Text style={globalStyles.strong}>No Video yet</Text>
          </View>
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
