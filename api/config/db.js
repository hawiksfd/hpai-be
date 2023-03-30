import { Sequelize } from "sequelize";

const db = new Sequelize("hpai-be-test", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
