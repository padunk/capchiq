import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLOR} from '../../Style/styles';

const HomeHeader = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.headerTitle}>Capchiq</Text>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  wrapper: {
    elevation: 10,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowOffset: {height: -10, width: 0},
    shadowRadius: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLOR.black,
  },
});
