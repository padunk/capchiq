import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {COLOR} from '../Style/styles';
import {AppProps} from './MainScreen';

const SkipButton = ({...props}) => (
  <TouchableOpacity {...props}>
    <Text style={styles.controlText}>Skip</Text>
  </TouchableOpacity>
);

const NextButton = ({...props}) => (
  <TouchableOpacity {...props}>
    <Text style={styles.controlText}>Next</Text>
  </TouchableOpacity>
);

const DoneButton = ({...props}) => (
  <TouchableOpacity {...props}>
    <Text style={[styles.controlText, styles.doneText]}>Done</Text>
  </TouchableOpacity>
);

const Dots = ({selected}: any) => {
  let backgroundColor = selected ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.3)';
  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const OnboardingScreen = ({navigation}: AppProps) => {
  return (
    <Onboarding
      SkipButtonComponent={SkipButton}
      NextButtonComponent={NextButton}
      DoneButtonComponent={DoneButton}
      DotsComponent={Dots}
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.navigate('Login')}
      pages={[
        {
          backgroundColor: '#440944',
          image: (
            <Image
              source={require('../../assets/images/one.png')}
              style={styles.image}
            />
          ),
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#095509',
          image: (
            <Image
              source={require('../../assets/images/two.png')}
              style={styles.image}
            />
          ),
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  controlText: {marginHorizontal: 20, color: COLOR.primaryColor, fontSize: 16},
  doneText: {color: COLOR.secondaryColor},
  image: {height: 200, width: 200, resizeMode: 'contain'},
});
