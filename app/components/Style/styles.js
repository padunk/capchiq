import {StyleSheet} from 'react-native';

const primaryColor = '#2865D6';
const secondaryColor = '#CB6BD6';
const grayColor = '#efefef';

export const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: primaryColor,
    marginBottom: 30,
  },
  button: {
    height: 55,
    marginHorizontal: 30,
    marginBottom: 20,
    backgroundColor: primaryColor,
    marginTop: 20,
    padding: 10,
    paddingLeft: 70,
    paddingRight: 70,
    fontSize: 24,
    borderRadius: 50,
  },

  buttonText: {
    color: grayColor,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.34,
    textAlign: 'center',
  },
});
