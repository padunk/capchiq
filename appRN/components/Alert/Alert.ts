import {Alert, AlertButton, AlertOptions} from 'react-native';

interface AlertProps {
  title: string;
  msg?: string;
  buttons?: AlertButton[];
  options?: AlertOptions;
}

const AlertComponent = ({title, msg, buttons, options}: AlertProps) => {
  if (title === '' || title === undefined || title === null) {
    return;
  }
  // default value if not provided
  if (msg === '' || msg === undefined || msg === null) {
    msg = '';
  }
  if (buttons === '' || buttons === undefined || buttons === null) {
    buttons = [{text: 'OK', onPress: () => {}}];
  }
  if (options === '' || options === undefined || options === null) {
    options = {};
  }
  return Alert.alert(title, msg, buttons, options);
};

export default AlertComponent;
