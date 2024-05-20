import { Dialect, Options } from 'sequelize';
import getConfig from './base.config';

interface IDBConfigENV {
  DB_DIALECT: Dialect;
  DB_HOSTNAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_LOGGING: string;
  DB_NAME: string;
  DB_PORT: string;
}
const DBrequirements: string[] = [
  'DB_DIALECT',
  'DB_HOSTNAME',
  'DB_USER',
  'DB_PASSWORD',
  'DB_LOGGING',
  'DB_PORT',
  'DB_NAME',
];
const dbConfig = getConfig<IDBConfigENV>(DBrequirements);
const config: Options = {
  host: dbConfig.DB_HOSTNAME,
  dialect: dbConfig.DB_DIALECT,
  logging: dbConfig.DB_LOGGING.toLowerCase() == 'true' ? true : false,
  define: {
    timestamps: true,
    underscored: true,
  },
  database: dbConfig.DB_NAME,
  username: dbConfig.DB_USER,
  password: dbConfig.DB_PASSWORD,
  port: Number(dbConfig.DB_PORT),
};
export default config;
