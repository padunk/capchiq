import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {generateColor} from '../../../../Utils/colorGrading';
import {toMonthYear} from '../../../../Utils/helpers';
import {firebaseDatabase} from '../../../Firebase/Firebase';
import {UserContext} from '../../../Provider/UserProvider';
import {COLOR} from '../../../Style/styles';

const UserDetail = () => {
  const [userData, setUserData] = useState(null);
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
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {userData !== null && (
          <>
            <View style={styles.imageWrapper}>
              {userData.photoURL === null || userData.photoURL === '' ? (
                <IonIcons name="person-circle" size={80} />
              ) : (
                <Image
                  source={{uri: userData.photoURL}}
                  style={{width: 40, height: 40}}
                />
              )}
            </View>
            <View style={styles.info}>
              <Text style={styles.infoHeader}>{userData.displayName}</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.infoBodyWrapper}>
                  <Text style={styles.infoBody}> Videos</Text>
                  <Text style={styles.count}>{userData.fansCount}</Text>
                </View>
                <View style={styles.infoBodyWrapper}>
                  <Text style={styles.infoBody}>Fans</Text>
                  <Text style={styles.count}>{userData.fansCount}</Text>
                </View>
              </View>
              <Text style={styles.infoFooter}>
                Joined {toMonthYear(userData.createdAt)}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: generateColor(COLOR.grayColor, 400),
    borderBottomWidth: 1,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  info: {
    flex: 1,
    paddingHorizontal: 24,
    color: COLOR.black,
  },
  infoHeader: {
    color: COLOR.black,
    fontSize: 24,
  },
  infoBodyWrapper: {
    paddingVertical: 8,
    justifyContent: 'center',
    marginRight: 32,
  },
  infoBody: {
    color: generateColor(COLOR.grayColor, 700),
    textTransform: 'uppercase',
    fontSize: 16,
    paddingHorizontal: 8,
    paddingBottom: 4,
    borderBottomColor: generateColor(COLOR.grayColor, 700),
    borderBottomWidth: 1,
  },
  count: {
    fontSize: 32,
    color: COLOR.black,
    display: 'flex',
    textAlign: 'center',
  },
  infoFooter: {
    color: generateColor(COLOR.grayColor),
    fontSize: 16,
  },
});
