const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  name: { type: String },
  release_date: { type: String },
});

const movieModel = mongoose.model("movieModel", MovieSchema, "movies");

module.exports = movieModel;
