/**
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Routes from '../Routes/Routes';
import OnboardingScreen from './OnboardingScreen';
import AuthProvider from '../AuthProvider/AuthProvider';
import UserProvider from '../Provider/UserProvider';

type AppStackParamList = {
  Onboarding: undefined;
  Login: undefined;
};

type StackScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'Onboarding'
>;

type FirstRoute = 'Onboarding' | 'Login' | undefined;

export type AppProps = {
  navigation: StackScreenNavigationProp;
};

const AppStack = createStackNavigator<AppStackParamList>();

const MainScreen = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState<Boolean | null>(
    null,
  );
  let routeName: FirstRoute;

  React.useEffect(() => {
    const launchKey = 'alreadyLaunched';
    // AsyncStorage.clear();

    AsyncStorage.getItem(launchKey).then((val) => {
      if (val === null) {
        AsyncStorage.setItem(launchKey, 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch) {
    routeName = 'Onboarding';
  } else {
    routeName = 'Login';
  }

  return (
    <AuthProvider>
      <UserProvider>
        <NavigationContainer>
          <AppStack.Navigator
            headerMode="none"
            initialRouteName={routeName}
            screenOptions={{header: () => null}}>
            <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
            <AppStack.Screen name="Login" component={Routes} />
          </AppStack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </AuthProvider>
  );
};

export default MainScreen;
