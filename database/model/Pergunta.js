import { Sequelize } from "sequelize";
import connection from "../db.js";

export const PerguntaModel = connection.define("pergunta", {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
})

PerguntaModel.sync({ force: false }).then(() => {
  console.log("Tabela criada com sucesso!");
})

