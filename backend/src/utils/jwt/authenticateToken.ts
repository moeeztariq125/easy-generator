import jwt, { VerifyCallback } from 'jsonwebtoken';
import { JWTConfig } from '../../config';

const access_secret = JWTConfig.ACCESS_TOKEN_SECRET;
const refresh_secret = JWTConfig.REFRESH_TOKEN_SECRET;

export function authenticateAccessToken(token: string, callback: VerifyCallback) {
  return jwt.verify(token, access_secret, (err, user) => callback(err, user));
}

export function authenticateRefreshToken(token: string, callback: Function) {
  return jwt.verify(token, refresh_secret, (err, user) => callback(err, user));
}
