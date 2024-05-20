import getConfig from './base.config';

interface AppConfig {
  PORT: string;
}

const Apprequirements: [string] = ['PORT'];
const appConfig = getConfig<AppConfig>(Apprequirements);
export default appConfig;
