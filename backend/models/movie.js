const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  imdb_id: { type: String },
  name: { type: String },
  genres: { type: Array },
  release_date: { type: String },
  backdrop_path: { type: String },
  poster_path: { type: String },
  original_language: { type: String },
  overview: { type: String },
  original_title: { type: String },
  production_companies: { type: Array },
  production_countries: { type: Array },
  spoken_languages: { type: Array },
  status: { type: String },
  tagline: { type: String },
  vote_average: { type: Number },
  vote_count: { type: Number },
  adult: { type: Boolean },
  revenue: { type: Number },
});

const movieModel = mongoose.model("movieModel", MovieSchema, "movies");

module.exports = movieModel;
