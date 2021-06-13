const mongoose = require("mongoose");
const statSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  movie_id: { type: String, required: true },
  score: { type: Number },
  like: { type: Number },
});
const statModel = mongoose.model("statModel", statSchema, "stats");
module.exports = statModel;
