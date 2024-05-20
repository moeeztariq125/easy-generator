import { Sequelize, Options } from 'sequelize';
import { dbConfig } from '../../config';

class Database {
  private connection: Sequelize | undefined;

  constructor(dbConfig: Options) {
    this.connectToDatabase(dbConfig);
  }

  private async connectToDatabase(dbConfig: Options) {
    try {
      this.connection = new Sequelize(dbConfig);

      await this.connection.authenticate();
      console.log('DB connection successfully established');
    } catch (err) {
      console.log('Cannot connect to the database. Retrying in 5 seconds.', err);
      await this.delay(5000);
      await this.connectToDatabase(dbConfig);
    }
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public getConnection(): Promise<Sequelize> {
    return new Promise((resolve, reject) => {
      const checkConnection = () => {
        if (this.connection) {
          resolve(this.connection);
        } else {
          setTimeout(checkConnection, 1000);
        }
      };

      checkConnection();
    });
  }
}

const db = new Database(dbConfig);
export default db;
