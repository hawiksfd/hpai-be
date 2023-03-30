import { Sequelize } from "sequelize";
import db from "./../config/db.js";
const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Users;
