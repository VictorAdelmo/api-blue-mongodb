require("dotenv").config();
const express = require("express");
const Character = require("./models/Character");
const mongoose = require("mongoose");

const app = express();

const port = 3000 || process.env.PORT;

app.use(express.json());

try {
  mongoose.connect(process.env.DATABASE_URI, {
    //Config evitar erros
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Conectado");
} catch (err) {
  console.log(err);
}

//GET - READ
app.get("/characters/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send({ message: "Id invalido" });
    return;
  }

  const character = await Character.findById(id);
  if (!character) {
    return res.status(400).send({ message: "Personagem não encontrado" });
  }

  res.send(character);
});

app.get("/characters", async (req, res) => {
  const characteres = await Character.find();

  if (characteres.length === 0) {
    res.status(400).send({ message: "Nulo" });
    return;
  }

  res.send(characteres);
});

// POST - CREATE
app.post("/characters", async (req, res) => {
  const { name, species, house, actor } = req.body;

  if (!name || !species || !house || !actor) {
    res.send({ message: "Erro" });
  } else {
    const character = await new Character({
      name,
      species,
      house,
      actor,
    });
    await character.save();
    res.send({ message: "Personagem Criado com Sucesso" });
  }
});

app.put("/character/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send({ message: "Id invalido" });
    return;
  }
  const character = await Character.findById(id);

  if (!character) {
    return res.status(400).send({ message: "Personagem não encontrado" });
  }

  const { name, species, house, actor } = req.body;

  if (!name || !species || !house || !actor) {
    res.status(400).send({ message: "Erro" });
    return;
  }

  character.name = name;
  character.species = species;
  character.house = house;
  character.actor = actor;

  await character.save();

  res.send({ message: "Personagem Atualizado" });
});

app.delete("/character/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send({ message: "Id Invalido" });
    return;
  }

  const character = await Character.findById(id);
  await character.remove();

  res.send({ message: "Personagem Excluido" });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);


  
});
