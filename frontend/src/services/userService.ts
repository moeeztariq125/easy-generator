import { checkUser, signIn, signUp } from '../api/api';
import { ICheckUser, ISignInResponse, ISignUpResponse } from '../api/apiInterfaces';

export const userService = {
  checkUser: async (email: string): Promise<ICheckUser> => {
    try {
      const response = await checkUser(email);
      return response.data;
    } catch (err: any) {
      throw err;
    }
  },
  signUp: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dob: string
  ): Promise<ISignUpResponse> => {
    try {
      const data = {
        email,
        password,
        firstName,
        lastName,
        dob,
      };
      const response = await signUp(data);
      return response.data;
    } catch (err: any) {
      throw err;
    }
  },
  signIn: async (email: string, password: string): Promise<ISignInResponse> => {
    try {
      const data = { email, password };
      const response = await signIn(data);
      return response.data;
    } catch (err: any) {
      throw err;
    }
  },
  logOut: () => {
    localStorage.clear();
  },
};
