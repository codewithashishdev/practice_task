import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

// Define the attributes for the User model
interface UserAttributes {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role?: string;
  resetTokenExpiration?: Date;
  created_at?: Date;
  updated_at?: Date;
}

// Define the model creation attributes
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public firstName?: string;
  public lastName?: string;
  public email!: string;
  public password!: string;
  public role?: string;
  public resetTokenExpiration?: Date;
  public created_at?: Date;
  public updated_at?: Date;
}

// Define and export the User model
const UserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING(255)
      },
      lastName: {
        type: DataTypes.STRING(255)
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      role: {
        type: DataTypes.STRING(500),
      },
      resetTokenExpiration: {
        type: DataTypes.DATE,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    },
    {
      indexes: [
        {
          fields: ['id', 'firstName', 'email'],
        },
      ],
      tableName: 'tbl_user',
      timestamps: false,
      sequelize,
    }
  );

  return User;
};

export default UserModel;