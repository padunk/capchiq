import React, {useContext} from 'react';
import {View, Text, Button, Image} from 'react-native';
import {AuthContext} from '../AuthProvider/AuthProvider';

function Settings() {
  const {user, logout} = useContext(AuthContext);
  return (
    <>
      <Text>{user?.public.displayName}</Text>
      <Button onPress={logout} title="Log out" />
    </>
  );
}

export default Settings;
