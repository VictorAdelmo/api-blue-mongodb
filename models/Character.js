const moongose = require('mongoose');

const characterSchema = new moongose.Schema({
    name:{
        type: String,
        require: true
    },
    species:{
        type: String,
        require: true
    },
    house:{
        type: String,
        require: true
    },
    actor:{
        type: String,
        require: true
    }
});

module.exports = moongose.model("Character", characterSchema);

