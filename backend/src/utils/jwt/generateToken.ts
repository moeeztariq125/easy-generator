import jwt from 'jsonwebtoken';
import { JWTConfig } from '../../config';

const access_secret = JWTConfig.ACCESS_TOKEN_SECRET;
const refresh_secret = JWTConfig.REFRESH_TOKEN_SECRET;

export default (userID: string) => {
  return {
    accessToken: jwt.sign({ id: userID }, access_secret, { expiresIn: '5m' }),
    refreshToken: jwt.sign({ id: userID }, refresh_secret, { expiresIn: '1h' }),
  };
};
