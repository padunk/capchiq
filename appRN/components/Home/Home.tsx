import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import Spacer from '../Spacer/Spacer';
import {AuthContext} from '../AuthProvider/AuthProvider';

const Home = () => {
  const {user, logout} = useContext(AuthContext);
  const [contentList, setContentList] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://192.168.168.17:6060/contents/123456')
      .then((response) => response.text())
      .then((data) => setContentList(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <View>
        <Spacer marginTop={50} />
        <Text style={styles.title}>Hi {user?.displayName}!</Text>
        <Text>{contentList}</Text>
        <Button onPress={logout} title="Log out" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 30,
  },
});

export default Home;
