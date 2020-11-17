import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {UserPublicData} from '../../../../Types/types';
import {firebaseDatabase} from '../../../Firebase/Firebase';
import {UserContext} from '../../../Provider/UserProvider';
import UserDetailHeader from './components/UserDetailHeader';
import UserPosts from './components/UserPosts';

const UserDetail = () => {
  const [userData, setUserData] = useState<UserPublicData | null>(null);
  const {userID} = useContext(UserContext);

  useEffect(() => {
    async function getUserData(id: string) {
      const idolSnapshot = await firebaseDatabase
        .ref('/users/' + id)
        .child('public')
        .once('value');

      setUserData(idolSnapshot.exportVal());
    }

    getUserData(userID);
  }, [userID]);

  return (
    <View style={styles.container}>
      {userData !== null && (
        <>
          <UserDetailHeader userData={userData} />
          <UserPosts userData={userData} />
        </>
      )}
    </View>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
