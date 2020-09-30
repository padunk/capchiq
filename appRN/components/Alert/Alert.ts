import {Alert, AlertButton, AlertOptions} from 'react-native';

interface AlertProps {
  title: string;
  msg?: string;
  buttons?: AlertButton[];
  options?: AlertOptions;
}

const AlertComponent = ({title, msg, buttons, options}: AlertProps) => {
  return Alert.alert(title, msg, buttons, options);
};

export default AlertComponent;
