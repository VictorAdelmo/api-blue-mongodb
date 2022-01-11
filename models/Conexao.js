const mongoose = require("mongoose");
require("dotenv").config();

try {
  mongoose.connect(process.env.DATABASE_URI, {
    //Config evitar erros
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  module.exports = mongoose;

  console.log("Conectado");
} catch (err) {
  console.log(err);
}
