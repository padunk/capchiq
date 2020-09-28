import {StyleSheet} from 'react-native';

export const COLOR = {
  primaryColor: '#8560eb',
  primaryLightColor: '#CB6BD6',
  secondaryColor: '#2865D6',
  secondaryLightColor: '#82f5fa',
  accentColor: '#f59fa2',
  grayColor: '#a0aec0',
  red: 'orangered',
  redError: 'indianred',
  black: '#0f0f0f',
  white: '#fdfdfd',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: COLOR.primaryColor,
    marginBottom: 30,
    paddingHorizontal: 40,
  },
  form: {
    marginHorizontal: 40,
    width: '100%',
    paddingLeft: 40,
    paddingRight: 40,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputTitle: {
    color: COLOR.primaryColor,
    fontSize: 14,
    textTransform: 'uppercase',
    width: '100%',
  },
  input: {
    borderBottomColor: COLOR.accentColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 18,
  },
  button: {
    height: 55,
    marginHorizontal: 30,
    marginBottom: 20,
    backgroundColor: COLOR.secondaryColor,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 24,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLOR.grayColor,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1.34,
    textAlign: 'center',
  },
  error: {
    color: COLOR.redError,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'left',
    textTransform: 'none',
  },
  link: {
    color: COLOR.secondaryColor,
  },
  inform: {
    fontSize: 18,
    fontWeight: '600',
  },
});
