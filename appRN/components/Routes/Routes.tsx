/**
 * @format
 * @flow
 */

import React, {useState, useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import firebase from '../Firebase/Firebase';
import Loading from '../Loading/Loading';
import AuthStack from '../AuthStack/AuthStack';
import AppTab from '../AppTab/AppTab';
import {AuthContext} from '../AuthProvider/AuthProvider';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((usr) => {
      if (usr) {
        // cookies? token?
        console.log('user is signed in:', user);
        setUser(usr);
      }
      setLoading(false);
    });
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <AppTab /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
