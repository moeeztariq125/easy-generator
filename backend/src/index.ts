import { config } from 'dotenv';
config();
import { expressApp, subscribeRoutes } from './loaders';

function init() {
  const app = expressApp();
  subscribeRoutes(app);
}

init();
