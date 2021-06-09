const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  id_mdb: { type: Number, required: true, unique: true },
  name: { type: String },
  genre_idsm: { type: Array },
  release_date: { type: String },
});

const movieModel = mongoose.model("movieModel", MovieSchema, "movies");

module.exports = movieModel;
