import React, {useState, useContext} from 'react';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import Center from '../Center/Center';
import {AuthContext} from '../AuthProvider/AuthProvider';

function Upload() {
  const {user} = useContext(AuthContext);
  const [description, setDescription] = useState('');

  const postContent = () => {
    try {
      fetch(`http://192.168.168.17:6060/contents/${user.uid}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content_id: uuidv4(),
          content_description: description,
          created_on: new Date(),
          created_by: user.uid,
        }),
      });
    } catch (error) {
      // should return error to user
    }
  };

  return (
    <Center>
      <TextInput
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <TouchableOpacity onPress={postContent}>
        <Text>Upload</Text>
      </TouchableOpacity>
    </Center>
  );
}

export default Upload;
