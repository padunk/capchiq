import {Dimensions} from 'react-native';

// from SO https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
export const validEmailRegex = new RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
);

export const {width: WIDTH} = Dimensions.get('window');
export const {height: HEIGHT} = Dimensions.get('window');
