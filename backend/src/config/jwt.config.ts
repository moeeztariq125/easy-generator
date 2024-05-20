import getConfig from './base.config';

interface JWTConfig {
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
}

const JWTrequirements: string[] = ['ACCESS_TOKEN_SECRET', 'REFRESH_TOKEN_SECRET'];
const JWTConfig = getConfig<JWTConfig>(JWTrequirements);
export default JWTConfig;
