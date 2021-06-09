<template>
  <div class="home">
    <div class="hero">
      <h1>BIENVENU</h1>
    </div>
    <h3>Ta sélection de films prefs</h3>
    <!-- <input v-model="movieName" placeholder="edit me" />
    <p>Message is: {{ movieName }}</p> -->
    <ul id="array-rendering">
      <li v-for="movie in movies" :key="movie.id">
        <Movie :movie="movie" />
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import Movie from "@/components/Movie.vue";
import axios from "axios";

export default {
  //j'exporte de mon fichier.
  name: "Home",
  components: {
    Movie,
  },
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

.hero {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero h1 {
  font-family: "BebasNeue";
  color: #a9cef4;
  letter-spacing: 1rem;
  font-size: 8rem;
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

h1 {
  margin: 2rem 0;
  color: white;
}

h3 {
  margin: 40px 0 0;
}

a {
  color: #42b983;
}
</style>
