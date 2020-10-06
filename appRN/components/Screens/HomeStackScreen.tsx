import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PostDetail from '../Home/components/PostDetail';
import Home from '../Home/Home';
import UserDetail from '../Home/components/UserDetail';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="PostDetail" component={PostDetail} />
      <HomeStack.Screen name="UserDetail" component={UserDetail} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
