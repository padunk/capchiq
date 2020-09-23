import * as yup from 'yup';
import {validEmailRegex} from '../Utils/CONSTANTS';

type TestParam = string | null | undefined;

const validation = {
  name: yup.string().defined().min(3).max(30),
  email: yup
    .string()
    .email()
    .defined()
    .test(
      'Must be valid email address',
      'Email must be valid email address',
      (value: TestParam) => {
        return validEmailRegex.test(value!);
      },
    ),
  password: yup
    .string()
    .defined()
    .min(8)
    .test(
      'Must include number, uppercase letter, lowercase letter',
      'Password must include at least a number, uppercase letter, lowercase letter, and symbol',
      (val: TestParam) => {
        const symbolRegex = new RegExp(/[\W\S_]/);
        if (!val) return false;

        if (!/d*/.test(val)) return false;
        if (!/[a-zA-Z]/.test(val)) return false;
        if (!symbolRegex.test(val)) return false;

        return true;
      },
    ),
  simplePassword: yup.string().defined(),
};

export const RegisterSchema = yup.object({
  name: validation.name,
  email: validation.email,
  password: validation.password,
});

export const LoginSchema = yup.object({
  email: validation.email,
  password: validation.simplePassword,
});

export const ForgotPasswordSchema = yup.object({
  email: validation.email,
});
