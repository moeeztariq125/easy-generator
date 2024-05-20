import { IUserModelAttrs } from '../../db/models/User.model';
import { UserRepository } from '../../repositories';
import { compareHash } from '../../utils/hasher/hashPasswords';

class usersServiceClass {
  private userRepo: UserRepository;
  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  async createUser(user: Partial<IUserModelAttrs>): Promise<Partial<IUserModelAttrs> | null> {
    try {
      const createdUser = await this.userRepo.create(user);
      return createdUser;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  /**
   * Method to check if user exists in database
   * @param email - Email address of the user
   * @returns A Promise that resolves to a boolean indicating whether the user exists
   */
  async checkUser(email: string): Promise<boolean> {
    try {
      const user = await this.userRepo.findOne({
        where: { email },
        attributes: ['email'],
      });
      return user ? true : false;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  /**
   * Method to check if user exists in database and fetches that user
   * @param email - Email address of the user
   * @returns A Promise that resolves to a user indicating whether the user exists
   */
  async checkAndFetchUser(email: string): Promise<IUserModelAttrs> {
    try {
      const user = await this.userRepo.findOne({
        where: { email },
      });
      return user;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async comparePasswords(toCompare: string, original: string): Promise<boolean> {
    return await compareHash(toCompare, original);
  }
}

export default usersServiceClass;
