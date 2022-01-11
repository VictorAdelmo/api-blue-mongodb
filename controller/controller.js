const Character = require("../models/Character");
const mongoose = require("../models/Conexao");

const getAllPers = async (req, res) =>{
    const characteres = await Character.find();
    if (characteres.length === 0) {
      res.status(400).send({ message: "Nulo" });
      return;
    }
    res.send(characteres);
}

const getPerId = async (req, res) =>{
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({ message: "Id invalido" });
      return;
    }
    const character = await Character.findById(id);
    if (!character) {
      return res.status(404).send({ message: "Personagem não encontrado" });
    } 
    res.send(character);
}

const deletePerId = async (req, res) =>{
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({ message: "Id Invalido" });
      return;
    }
  
    const character = await Character.findById(id);
    
    if(!character){
        res.status(404).send({message: "Não Encontrado"})
        return;
    }
    
    await character.remove();
    res.send({ message: "Personagem Excluido" });
}

const updatePerId = async (req, res) =>{
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({ message: "Id invalido" });
      return;
    }
    const character = await Character.findById(id);
    if (!character) {
      return res.status(404).send({ message: "Personagem não encontrado" });
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
}

const cadastrar = async (req, res) =>{
    const { name, species, house, actor } = req.body;
    if (!name || !species || !house || !actor) {
      res.status(400).send({ message: "Erro" });
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
}

module.exports = {
    getAllPers,getPerId,cadastrar,updatePerId,deletePerId
};