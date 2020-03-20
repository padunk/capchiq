import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon, {iconsByName} from 'react-native-vector-icons/Octicons';

import Home from '../Home/Home';
import Settings from '../Settings/Settings';

const Tab = createBottomTabNavigator();

function AppTab() {
  console.log('icons', iconsByName);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Settings') {
            iconName = 'gear';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default AppTab;
