import React from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';

import Center from '../Center/Center';
import {globalStyles} from '../Style/styles';
import {UploadProps} from './Upload';

const UploadChoice = ({navigation}: UploadProps) => {
  return (
    <Center>
      <Text style={globalStyles.title}>Share your best talent!</Text>
      <View>
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => navigation.navigate('Record')}>
          <Text style={globalStyles.buttonText}>
            <IconSimple name="camrecorder" size={24} />
            {'  '}Record Video
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => navigation.navigate('UploadFile')}>
          <Text style={globalStyles.buttonText}>
            <Icon name="upload" size={24} />
            {'  '}Upload File
          </Text>
        </TouchableOpacity>
      </View>
    </Center>
  );
};

export default UploadChoice;
