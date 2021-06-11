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
    //jusqu a 441
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=57359ff087905e870d40ba4880a1dce0&language=fr` +
        `&page=` +
        i
    );
    console.log(i);
    for (const movie of response.data.results) {
      const infos_movie = await axios.get(
        `https://api.themoviedb.org/3/movie/` +
          movie.id +
          `?api_key=57359ff087905e870d40ba4880a1dce0&language=fr`
      );
      const credits_movie = await axios.get(
        `https://api.themoviedb.org/3/movie/` +
          movie.id +
          `/credits?api_key=57359ff087905e870d40ba4880a1dce0&language=fr`
      );

      const newMovie = new movieModel({
        //crée un nouveau film et l'inserre dans la bdd
        adult: infos_movie.data.adult,
        backdrop_path: infos_movie.data.backdrop_path,
        genres: infos_movie.data.genres,
        id: infos_movie.data.id,
        imdb_id: infos_movie.data.imdb_id,
        original_language: infos_movie.data.original_language,
        original_title: infos_movie.data.original_title,
        overview: infos_movie.data.overview,
        popularity: infos_movie.data.popularity,
        poster_path: infos_movie.data.poster_path,
        production_companies: infos_movie.data.production_companies,
        production_countries: infos_movie.data.production_countries,
        release_date: infos_movie.data.release_date,
        revenue: infos_movie.data.revenue,
        runtime: infos_movie.data.runtime,
        spoken_languages: infos_movie.data.spoken_languages,
        status: infos_movie.data.status,
        tagline: infos_movie.data.tagline,
        name: infos_movie.data.title,
        vote_average: infos_movie.data.vote_average,
        vote_count: infos_movie.data.vote_count,
        credits: credits_movie.data,
      });

      newMovie.save().then(function () {});
    }
  }
}

run();
