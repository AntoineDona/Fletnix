const axios = require("axios");
const movieModel = require("../models/movie");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// for (let i = 1; i < 441; i++) {

async function run() {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=57359ff087905e870d40ba4880a1dce0` //+ `&page=` +i
  );

  for (const movie in response.data.results) {
    const newMovie = new movieModel({
      //crée un nouveau film et l'inserre dans la bdd
      name: movie.name,
      release_date: movie.release_date,
    });

    newMovie.save().then(function (newDocument) {
      console.log("ok", newDocument.id);
    });
  }

  // }
}

run();
