import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Octicons';

import Home from '../Home/Home';
import Search from '../Search/Search';
import Upload from '../Upload/Upload';
import Notifications from '../Notifications/Notifications';
import Settings from '../Settings/Settings';

type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  Upload: undefined;
  Notifications: undefined;
  Settings: undefined;
};

type TabRouteProp = RouteProp<RootTabParamList, 'Home'>;

type TabNavigationProp = BottomTabScreenProps<RootTabParamList, 'Home'>;

export type BottomTabProps = {
  route: TabRouteProp;
  navigation: TabNavigationProp;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

function AppTab() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Search':
              iconName = 'search';
              break;
            case 'Upload':
              iconName = 'flame';
              break;
            case 'Notifications':
              iconName = 'bell';
              break;
            case 'Settings':
              iconName = 'gear';
              break;
            default:
              console.log('name is not legal');
              return;
          }

          // You can return any component that you like here!
          return (
            <Icon
              name={iconName}
              size={route.name === 'Upload' ? 35 : size}
              color={color}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Upload" component={Upload} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default AppTab;
