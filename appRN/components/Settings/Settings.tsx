import React, {useContext} from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import {UserData} from '../../Types/types';
import {toBirthDate} from '../../Utils/helpers';
import {AuthContext} from '../AuthProvider/AuthProvider';
import UserDetailHeader from '../Home/components/UserDetail/components/UserDetailHeader';
import UserPosts from '../Home/components/UserDetail/components/UserPosts';
import {globalStyles} from '../Style/styles';

function Settings() {
  const {user, logout} = useContext(AuthContext);

  const showProfile = (user: UserData) => {
    if (user !== null) {
      return (
        <View style={globalStyles.container}>
          <UserDetailHeader userData={user.public} />
          <View style={styles.container}>
            <Text>
              <Text style={globalStyles.strong}>Email:</Text>{' '}
              {user.private.email}
            </Text>
            <Text>
              <Text style={globalStyles.strong}>Phone:</Text>{' '}
              {user.private.phoneNumber}
            </Text>
            <Text>
              <Text style={globalStyles.strong}>Birthday:</Text>{' '}
              {toBirthDate(user.private.birthDate)}
            </Text>
          </View>
          <UserPosts userData={user.public} />
        </View>
      );
    }
  };
  return (
    <>
      {user !== null && showProfile(user)}
      <Button onPress={logout} title="Log out" />
    </>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
