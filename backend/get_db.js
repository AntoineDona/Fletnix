const axios = require("axios");
const movieModel = require("./models/movie");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

async function run() {
  for (let i = 2; i < 441; i++) {
    //jusqu a 441
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=57359ff087905e870d40ba4880a1dce0` +
        `&page=` +
        i
    );
    console.log(i);
    for (const movie of response.data.results) {
      const infos_movie = await axios.get(
        `https://api.themoviedb.org/3/movie/` +
          movie.id +
          `?api_key=57359ff087905e870d40ba4880a1dce0`
      );
      const newMovie = new movieModel({
        //crée un nouveau film et l'inserre dans la bdd
        id_tmd: infos_movie.data.id,
        name: infos_movie.data.title,
        release_date: infos_movie.data.release_date,
        genres: infos_movie.data.genres,
        backdrop_path: infos_movie.data.backdrop_path,
        poster_path: infos_movie.data.poster_path,
        original_language: infos_movie.data.original_language,
        overview: infos_movie.data.overview,
        original_title: infos_movie.data.original_title,
        production_companies: infos_movie.data.production_companies,
        production_countries: infos_movie.data.production_countries,
        spoken_languages: infos_movie.data.spoken_languages,
        status: infos_movie.data.status,
        tagline: infos_movie.data.tagline,
        vote_average: infos_movie.data.vote_average,
        vote_count: infos_movie.data.vote_count,
      });

      newMovie.save().then(function () {});
    }
  }
}

run();
