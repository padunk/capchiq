import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Center from '../Center/Center';

function Greeting({navigation}) {
  return (
    <>
      <Center>
        {/* eslint-disable-next-line react-native/no-inline-styles*/}
        <View style={{justifyContent: 'flex-start'}}>
          <Text style={styles.title}>See your Idol's</Text>
          <Text style={styles.title}>
            {/* eslint-disable-next-line react-native/no-inline-styles*/}
            🔥 <Text style={{color: 'crimson'}}>posts</Text>
          </Text>
          <Text style={styles.title}>right now.</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.account}>Create account</Text>
          </TouchableOpacity>
        </View>
      </Center>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Have an account already?
          <Text
            onPress={() => navigation.navigate('Login')}
            style={styles.footerLink}>
            Log in
          </Text>
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 45,
    color: '#8560EB',
  },
  account: {
    marginTop: 20,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    color: '#82F5FA',
    backgroundColor: '#2865D6',
    fontSize: 24,
    borderRadius: 50,
  },
  footer: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 20,
    textAlign: 'center',
  },
  footerLink: {
    color: '#2865D6',
  },
});

export default Greeting;
