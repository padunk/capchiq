import React, {useContext} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import Spacer from '../Spacer/Spacer'

import {AuthContext} from '../AuthProvider/AuthProvider';

const Home = () => {
  const {user, logout} = useContext(AuthContext);
  return (
    <>
      <View>
        <Spacer marginTop={50} />
        <Text style={styles.title}>
          Hi {user.displayName}!
        </Text>
        <Button onPress={logout} title="Log out" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 30,

  }
})

export default Home;
