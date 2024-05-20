import { Model, DataTypes } from 'sequelize';
import db from '../database';
import { generateHash } from '../../utils/hasher/hashPasswords';

export interface IUserModelAttrs {
  userID: string;
  firstName: string;
  lastName: string;
  dob: Date;
  email: string;
  password: string;
}

class User extends Model<IUserModelAttrs> {
  declare userID: string;
  declare firstName: string;
  declare lastName: string;
  declare dob: Date;
  declare email: string;
  declare password: string;
}
(async () => {
  const connection = await db.getConnection();
  User.init(
    {
      userID: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      dob: {
        type: DataTypes.DATE,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'Users',
      sequelize: connection,
      timestamps: true,
      paranoid: true,
      hooks: {
        beforeCreate: async (user: User) => {
          if (user.password) {
            user.password = await generateHash(user.password);
          }
        },
        beforeUpdate: async (user: User) => {
          if (user.password) {
            user.password = await generateHash(user.password);
          }
        },
      },
    },
  );
  await User.sync();
})();

export default User;
