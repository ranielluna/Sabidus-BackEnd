const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const dbURI = process.env.MONGO_URI;
console.log("Tentando conectar ao MongoDB...");

mongoose.connect(dbURI)
  .then(() => console.log("Conectado ao Banco!"))
  .catch((erro) => {
    console.error("Erro ao conectar ao banco:", erro);
    process.exit(1);
  });

try {
  const usuarioRotas = require('./src/rotas/usuarioRotas');

  app.use("/usuarios", usuarioRotas);
  console.log("Rotas carregadas com sucesso!");
} catch (erro) {
  console.error("Erro ao carregar rotas:", erro);
  process.exit(1);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}!`);
});