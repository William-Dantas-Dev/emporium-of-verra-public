import * as yup from "yup";

export const authValidation = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(12, 'Password cannot be longer than 20 characters'),
});

export const registerValidation = yup.object({
  name: yup.string()
    .required('Name is required')
    .min(3, 'Password must be at least 6 characters')
    .max(40, 'Password cannot be longer than 40 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(12, 'Password cannot be longer than 20 characters'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  nick: yup.string().required('Nickname is required')
    .min(3, 'Password must be at least 3 characters')
    .max(20, 'Password cannot be longer than 40 characters'),
  server: yup.string().required('Server is required')
});