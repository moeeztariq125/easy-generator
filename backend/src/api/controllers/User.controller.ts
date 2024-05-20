import { NextFunction, Request, Response } from 'express';
import { usersServiceClass } from '../services';
import generateToken from '../../utils/jwt/generateToken';

class userControllerClass {
  private usersService: usersServiceClass;
  constructor(usersService: usersServiceClass) {
    this.usersService = usersService;
  }
  check = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      console.log('inside check', email);
      const exists = await this.usersService.checkUser(email);
      if (exists) {
        return res.status(200).json({
          message: 'OK|SUCCESS',
          redirectTo: 'SIGNIN',
        });
      }
      return res.status(200).json({
        message: 'OK|SUCCESS',
        redirectTo: 'SIGNUP',
      });
    } catch (err: any) {
      console.log('inside error');
      next(err);
    }
  };
  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, firstName, lastName, dob, password } = req.body;
      const exists = await this.usersService.checkUser(email);
      if (exists) {
        return res.status(200).json({
          message: 'OK|SUCCESS',
          redirectTo: 'SIGNIN',
        });
      }
      const userCreationObj = {
        email: String(email),
        firstName: String(firstName),
        lastName: String(lastName),
        dob: new Date(dob),
        password: String(password),
      };
      const userCreationResponse = await this.usersService.createUser(userCreationObj);
      if (!userCreationResponse?.userID) {
        throw new Error('Something Went Wrong while trying to create new user');
      }
      res.status(200).json({
        message: 'OK|SUCCESS',
        data: {
          firstName: userCreationResponse.firstName,
          lastName: userCreationResponse.lastName,
          userID: userCreationResponse.userID,
        },
      });
    } catch (err: any) {
      next(err);
    }
  };
  signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const exists = await this.usersService.checkAndFetchUser(email);
      if (!exists) {
        return res.status(200).json({
          message: 'OK|SUCCESS',
          redirectTo: 'SIGNUP',
        });
      }
      const match = await this.usersService.comparePasswords(password, exists.password ?? '');
      if (!match) {
        throw new Error('Wrong Password');
      }
      const tokens = generateToken(exists.userID);
      res.status(200).json({
        message: 'OK|SUCCESS',
        data: {
          firstName: exists.firstName,
          lastName: exists.lastName,
          userID: exists.userID,
          ...tokens,
        },
      });
    } catch (err: any) {
      next(err);
    }
  };
  protectedAPI = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(`You hit a protected API with userID - ${JSON.stringify(req.user)}`);
    } catch (err: any) {
      next(err);
    }
  };
}

export default userControllerClass;
