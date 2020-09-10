/**
 * @format
 * @flow
 */

import React, {useState, useEffect, useContext} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import * as firebase from 'firebase';

import Loading from '../Loading/Loading';
import AuthStack from '../AuthStack/AuthStack';
import AppTab from '../AppTab/AppTab';
import {AuthContext} from '../AuthProvider/AuthProvider';
import {firebaseConfig} from '../../secret';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(usr => {
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
