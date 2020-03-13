import React from 'react';
import {ActivityIndicator} from 'react-native';

import Center from '../Center/Center';

function Loading() {
  return (
    <Center>
      <ActivityIndicator size="large" />
    </Center>
  );
}

export default Loading;
