import * as yup from 'yup';


const passwordMinLengthRegex = /.{8,}/;
const passwordContainsNumberRegex = /\d+/;
const passwordContainsLetterRegex = /[a-zA-Z]+/;
const passwordContainsSpecialCharacterRegex = /[^a-zA-Z0-9\s]+/;

export const validationSchema = yup.object().shape({
    email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
    dob: yup
    .date()
    .required('Date of Birth is required')
    .max(new Date('2006-01-01'),'Must be older that 18 years'),
    firstName: yup
    .string()
    .required('Please Enter Your Name'),
    lastName: yup
    .string()
    .required('Please Enter Your Name'),
    password: yup
    .string()
    .required('Please Enter a Valid Password')
    .required('Please Enter a Valid Password')
    .matches(passwordMinLengthRegex, 'The password has to be a minimum of 8 characters')
    .matches(passwordContainsNumberRegex, 'Password needs to contain at least 1 number')
    .matches(passwordContainsLetterRegex, 'Password needs to contain at least 1 letter')
    .matches(passwordContainsSpecialCharacterRegex, 'Password needs to contain at least 1 special character')

})