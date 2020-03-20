import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';

import {AuthContext} from '../AuthProvider/AuthProvider';

const Home = () => {
  const {logout} = useContext(AuthContext);
  return (
    <>
      <View>
        <Text>Home Page</Text>
        <Button onPress={logout} title="Log out" />
      </View>
    </>
  );
};

export default Home;
