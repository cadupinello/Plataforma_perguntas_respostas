import { Sequelize } from "sequelize";

const connection = new Sequelize("guiaperguntas", "root", "3590", {
  host: "localhost",
  dialect: "mysql",
})

export default connection;