/**
 * @format
 * @flow
 */

import React, {useState, useEffect, useContext} from 'react';

import {firebase} from '../Firebase/Firebase';
import Loading from '../Loading/Loading';
import AuthStack from '../AuthStack/AuthStack';
import AppTab from '../AppTab/AppTab';
import {AuthContext} from '../AuthProvider/AuthProvider';
import {getAuthUserData} from '../Firebase/firebaseFunc';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((usr) => {
      setLoading(true);
      if (usr) {
        getAuthUserData(usr.uid)
          .then((data) => setUser(data))
          .catch((error) => {
            throw new Error(error);
          });
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <>{user ? <AppTab /> : <AuthStack />}</>;
};

export default Routes;
