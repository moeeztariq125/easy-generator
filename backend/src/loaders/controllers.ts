import { UserRepository } from '../repositories';
import { UserController } from '../api/controllers';
import { usersServiceClass } from '../api/services';

//Doing dependency injection
//----------Defining Repos--------------------//
const userRepo = new UserRepository();

const repos = {
  userRepo,
};
//----------Defining Services--------------------//
const userService = new usersServiceClass(userRepo);
const services = {
  userService,
};

//-----------Defining Controllers-------------------//
const userController = new UserController(userService);
const controllers = {
  userController,
};
export { repos, services, controllers };
