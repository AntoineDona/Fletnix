<template>
  <h1>This is an about page</h1>
  <form action="http://localhost:3000/movies/new" method="post">
    <div>
      <label for="name">Titre du film </label>
      <input type="text" placeholder="title" id="name" name="name" />
    </div>
    <div>
      <label for="release_date">Date de sortie</label>
      <input
        type="text"
        placeholder="release date"
        id="release_date"
        name="release_date"
      />
    </div>
    <input
      id="submit"
      class="btn"
      type="submit"
      name="Envoyer"
      value="Ajouter"
    />
  </form>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  //j'exporte de mon fichier.
  name: "About",
  components: {},
  data: function () {
    return {
      movieName: "test",
      movies: {},
      moviesLoadingError: "",
    };
  },
  methods: {
    fetchMovies: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=57359ff087905e870d40ba4880a1dce0`
        )
        .then((response) => {
          this.movies = response.data.results;
          console.log(this.movies);
        })
        .catch((error) => {
          this.moviesLoadingError = "An error occured while fetching movies.";
          console.error(error);
        });
    },
  },
  created() {
    console.log("count is: " + this.movieName);
    this.fetchMovies();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
}

ul {
  list-style-type: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

li {
  text-align: center;
}

h3 {
  margin: 40px 0 0;
}

a {
  color: #42b983;
}
</style>
