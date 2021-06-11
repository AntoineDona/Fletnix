const mongoose = require("mongoose");
const MovieSchema = new mongoose.Schema({
  adult: { type: Boolean },
  backdrop_path: { type: String },
  genres: { type: Array },
  id: { type: Number, required: true, unique: true },
  imdb_id: { type: String },
  original_language: { type: String },
  original_title: { type: String },
  overview: { type: String },
  popularity: { type: Number },
  poster_path: { type: String },
  production_companies: { type: Array },
  production_countries: { type: Array },
  release_date: { type: String },
  revenue: { type: Number },
  runtime: { type: Number },
  spoken_languages: { type: Array },
  status: { type: String },
  tagline: { type: String },
  name: { type: String },
  vote_average: { type: Number },
  vote_count: { type: Number },
  credits: { type: Array },
});

const movieModel = mongoose.model("movieModel", MovieSchema, "movies");

module.exports = movieModel;
