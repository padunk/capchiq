import React from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';

import Center from '../Center/Center';
import {styles} from '../Style/styles';

const UploadChoice = ({navigation}) => {
  return (
    <Center>
      <Text style={styles.title}>Share your best talent!</Text>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Record')}>
          <Text style={styles.buttonText}>
            <IconSimple name="camrecorder" size={24} />
            {'  '}Record Video
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UploadFile')}>
          <Text style={styles.buttonText}>
            <Icon name="upload" size={24} />
            {'  '}Upload File
          </Text>
        </TouchableOpacity>
      </View>
    </Center>
  );
};

export default UploadChoice;
