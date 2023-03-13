import { Sequelize } from "sequelize";
import connection from "../db.js";

export const RespostaModel = connection.define("respostas", {
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  perguntaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

RespostaModel.sync({ force: false }).then(() => {
  console.log("Tabela respostas criada com sucesso!");
})
