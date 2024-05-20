import express, { Express, json } from 'express';
import { appConfig } from '../config';
export default (): Express => {
  try {
    const app = express();
    app.use(json());
    app.listen(appConfig.PORT, () => {
      console.log(`Server listening on PORT: ${appConfig.PORT}`);
    });
    return app;
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};
