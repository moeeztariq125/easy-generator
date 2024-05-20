import bcrypt from 'bcrypt';
import { AppLogger } from '../logger';

const saltRounds = 10;

export const generateHash = async (password: string):Promise<string> => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (err: any) {
    AppLogger.error('Error While trying to hash passowrd: ', err);
    throw new Error('Something Went Wrong');
  }
};

export const compareHash = async (password: string, toCompare: string):Promise<boolean> => {
  try {
    const match = await bcrypt.compare(password,toCompare)
    return match
  } catch (err: any) {
    AppLogger.error('Error while trying to compare passwords: ', err);
    throw new Error('Something Went Wrong');
  }
};
