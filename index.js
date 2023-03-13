import express from "express";
import bodyParser from "body-parser";
import connection from "./database/db.js";
import {PerguntaModel} from "./database/model/Pergunta.js";
import {RespostaModel} from "./database/model/Resposta.js";

// app variavel que recebe a instancia do express e inicializa o servidor com as configurações padrões do express 
const app = express();

// configurações para reconhecer arquivos ejs como view engine (template engine) e usar o bodyParser 
app.set("view engine", "ejs");

// express.static serve para acessar arquivos estáticos (css, js, imagens, etc)
app.use(express.static("public"));

// body parser para receber os dados da requisição e enviar para o banco de dados
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conexão com o banco de dados e tabelas do banco de dados
connection.authenticate().then(() => {
  console.log("Conexão feita com o banco de dados!.");
}) .catch((err) => {
  console.log(err);
})

// Rotas

// rota para listar todas as perguntas do banco de dados
app.get("/", (req, res) => {
  PerguntaModel.findAll({ raw: true, order: [
    ['id', 'DESC'] // ASC = Crescenter || DESC = Decrescente
  ] }).then((perguntas) => {
    // select all from perguntas no sql
    res.render("index", { perguntas: perguntas });
  })
})

// rota para rendederizar a página de cadastro de perguntas 
app.get("/perguntas", (req, res) => {
  res.render("perguntas");
})

// rota para buscar uma pergunta pelo seu id e a resposta pelo id da pergunta no banco de dados
app.get("/pergunta/:id", (req, res) => {
  const id = req.params.id;
  PerguntaModel.findOne({ where: { id: id }, order: [ ['id', 'DESC'] ] }).then((pergunta) => {
    if(pergunta != undefined) {
      RespostaModel.findAll({ where: { perguntaId: pergunta.id } }).then((respostas) => {
        res.render("pergunta", { pergunta: pergunta, respostas: respostas });
      })
    } else {
      res.redirect("/");
    }
  })
})

// rota para cadastrar uma nova pergunta no banco de dados
app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  PerguntaModel.create({
    titulo: titulo,
    descricao: descricao,
  }).then(() => {
    res.redirect("/");
  })
})

// rota para cadastrar uma nova resposta no banco de dados
app.post("/responder", (req, res) => {
  var corpo = req.body.corpo;
  var perguntaId = req.body.pergunta;
  RespostaModel.create({
    corpo: corpo,
    perguntaId: perguntaId,
  }).then(() => {
    res.redirect(`/pergunta/${perguntaId}`);
  })
})

// Ouvindo a porta 3000 (ou qualquer outra porta) e chamando a função app.listen()

app.listen(3000, () => {
  console.log("Server is running on port 3000");
})