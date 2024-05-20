import { ValidationChain, body } from 'express-validator';

const passwordMinLengthRegex = /.{8,}/;
const passwordContainsNumberRegex = /\d+/;
const passwordContainsLetterRegex = /[a-zA-Z]+/;
const passwordContainsSpecialCharacterRegex = /[^a-zA-Z0-9\s]+/;

const checkValidator: ValidationChain[] = [
  body('email').isEmail().withMessage('Please enter a valid Email').bail(),
];

const signUpCompleteValidator: ValidationChain[] = [
  body('email').isEmail().withMessage('Please enter a valid Email').bail(),
  body('firstName').isString().notEmpty().withMessage('Please Enter your First Name').bail(),
  body('lastName').isString().notEmpty().withMessage('Please Enter your Last Name').bail(),
  body('dob').isDate().withMessage('Please Enter your Date of Birth').bail(),
  body('password').customSanitizer((value, { req }) => {
    const { password } = req.body;
    const check =
      passwordMinLengthRegex.test(password) &&
      passwordContainsNumberRegex.test(password) &&
      passwordContainsLetterRegex.test(password) &&
      passwordContainsSpecialCharacterRegex.test(password);
    if (!check) {
      throw new Error('Please Enter a strong password');
    }
    return password;
  }),
];

const signinValidator: ValidationChain[] = [
  body('email').isEmail().withMessage('Please enter a valid Email').bail(),
  body('password').isLength({ min: 8 }).withMessage('Please enter a valid password').bail(),
];

export { checkValidator, signUpCompleteValidator, signinValidator };
