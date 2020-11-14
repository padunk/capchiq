import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Animated, Easing} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IonIcons from 'react-native-vector-icons/Ionicons';

import {generateColor} from '../../../../../../Utils/colorGrading';
import {toMonthYear} from '../../../../../../Utils/helpers';
import {AuthContext} from '../../../../../AuthProvider/AuthProvider';
import {firebaseDatabase} from '../../../../../Firebase/Firebase';
import {updateFollow} from '../../../../../Firebase/firebaseFunc';
import {UserContext} from '../../../../../Provider/UserProvider';
import {COLOR, globalStyles} from '../../../../../Style/styles';

const UserDetailHeader = ({userData}) => {
  const [subscribe, setSubscribe] = useState<boolean | null>(null);
  const {userID} = useContext(UserContext);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    // check for subscription
    async function alreadyFollow(id: string) {
      if (user?.uid === id) {
        setSubscribe(null);
        return;
      }

      // check if already follow or not
      const followIdolID = await firebaseDatabase
        .ref('/follows/' + id)
        .child('/followID')
        .orderByChild(id)
        .limitToFirst(1)
        .once('value');

      followIdolID.val()[id] ? setSubscribe(true) : setSubscribe(false);
    }

    alreadyFollow(userID);
  }, []);

  const updateSubscription = () => {
    setSubscribe(!subscribe);
    // update database
    updateFollow({
      fansID: user!.uid,
      idolID: userID,
      wantToFollow: !subscribe!,
    });
  };

  const AnimatedIcon = Animated.createAnimatedComponent(IonIcons);
  let scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const runAnimation = () => {
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 5000,
        delay: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => runAnimation());
    };

    runAnimation();
  }, []);

  const subscription = () => {
    return subscribe === null ? (
      <></>
    ) : subscribe ? (
      <TouchableOpacity
        style={[globalStyles.flexRow, globalStyles.itemsCenter]}
        onPress={updateSubscription}>
        <IonIcons
          name="md-checkbox"
          size={24}
          color={generateColor(COLOR.grayColor, 500)}
        />
        <Text style={styles.subscribe}>Subscribe</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={[globalStyles.flexRow, globalStyles.itemsCenter]}
        onPress={updateSubscription}>
        <AnimatedIcon
          name="md-checkbox"
          size={24}
          color={generateColor(COLOR.primaryLightColor, 500)}
          style={{transform: [{scale: scaleAnim}]}}
        />
        <Text
          style={[
            styles.subscribe,
            {color: generateColor(COLOR.primaryColor, 500)},
          ]}>
          Subscribe
        </Text>
      </TouchableOpacity>
    );
  };

  return (
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
            {subscription()}
            <View style={globalStyles.flexRow}>
              <View style={styles.infoBodyWrapper}>
                <Text style={styles.infoBody}>Videos</Text>
                <Text style={styles.count}>{userData.videoCount}</Text>
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
  );
};

export default UserDetailHeader;

const styles = StyleSheet.create({
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
  subscribe: {
    color: generateColor(COLOR.grayColor, 700),
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
