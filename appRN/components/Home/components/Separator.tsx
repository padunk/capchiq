import React from 'react';
import {View} from 'react-native';
import {COLOR} from '../../Style/styles';

class Separator extends React.Component {
  render() {
    return (
      <View style={{marginTop: 16, marginBottom: 8}}>
        <View style={{height: 1, backgroundColor: COLOR.grayColor}} />
      </View>
    );
  }
}

export default Separator;
