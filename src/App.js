const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const dbURI = process.env.MONGO_URI;
console.log("Tentando conectar ao MongoDB...");

// Adiciona mais opções à conexão
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Conectado ao Banco com sucesso!");
})
.catch((erro) => {
  console.error("Erro detalhado ao conectar ao banco:");
  console.error(erro);
  process.exit(1);
});

try {
  const usuarioRotas = require("./rotas/usuarioRotas");
  app.use("/usuarios", usuarioRotas);
  console.log("Rotas carregadas com sucesso!");
} catch (erro) {
  console.error("Erro ao carregar rotas:");
  console.error(erro);
  process.exit(1);
}

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000!");
});