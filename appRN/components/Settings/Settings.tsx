import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {AuthContext} from '../AuthProvider/AuthProvider';

function Settings() {
  const {user, logout} = useContext(AuthContext);
  return (
    <>
      <Button onPress={logout} title="Log out" />
    </>
  );
}

export default Settings;
