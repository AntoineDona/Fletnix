const mongoose = require("mongoose");
const statSchema = new mongoose.Schema({
  id_user: { type: Number, required: true, unique: true },
  movie_id: { type: String, unique: true },
  score: { type: Number },
});
const statModel = mongoose.model("statModel", statSchema, "movies");
module.exports = statModel;