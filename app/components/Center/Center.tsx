import React, {ReactChild} from 'react';
import {View, StyleSheet} from 'react-native';

const Center: React.FunctionComponent = (props) => {
  return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Center;
