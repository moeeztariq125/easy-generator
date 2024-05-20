import * as yup from 'yup';
const passwordMinLengthRegex = /.{8,}/;

export const validationSchema = yup.object().shape({
    email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
    password: yup
    .string()
    .required('Please enter your password')
    .matches(passwordMinLengthRegex,'Please enter atleast 8 characters')
})