const axios = require("axios");
const movieModel = require("./models/movie");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

async function run() {
  for (let i = 1; i < 441; i++) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=57359ff087905e870d40ba4880a1dce0` +
        `&page=` +
        i
    );
    console.log(i);
    for (const movie of response.data.results) {
      const newMovie = new movieModel({
        //crée un nouveau film et l'inserre dans la bdd
        id_mdb: movie.id,
        name: movie.title,
        release_date: movie.release_date,
      });

      newMovie.save().then(function () {});
    }
  }
}

run();
