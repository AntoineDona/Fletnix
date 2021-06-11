<template>
  <div class="home">
    <input
      @keyup.enter="onChange"
      v-model="movieName"
      placeholder="Movie Research"
    />
    <ul id="array-rendering">
      <li v-for="movie in movies" :key="movie.id">
        <Movie :movie="movie" />
      </li>
    </ul>
  </div>
</template>

<script>
import Movie from "@/components/Movie.vue";
import axios from "axios";

export default {
  name: "Browse",
  components: {
    Movie,
  },
  data: function () {
    return {
      movieName: "",
      movies: [],
      usersLoadingError: "",
    };
  },
  watch: {
    // whenever question changes, this function will run
    movieName: function (newMovie, oldMovie) {
      this.getAnswer(newMovie);
    },
  },
  methods: {
    /* onChange: function () {
      window.location.href =
        "http://localhost:3000/movies?name=" + this.movieName;
    }, */
    /* fetchMovies: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=57359ff087905e870d40ba4880a1dce0`
        )
        .then((response) => {
          this.movies = response.data.results;
          console.log(this.movies);
        })
        .catch((error) => {
          this.usersLoadingError = "An error occured while fetching movies.";
          console.error(error);
        });
    }, */
    getAnswer: function (newMovie) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${newMovie}`
        )
        //.get(`http://localhost:3000/movies/search?name=${newMovie}`)
        .then((response) => {
          if (newMovie.length == 0) {
            return { message: `Enter a movies name` };
          } else {
            this.movies = response.data.results;
          }
          // Do something if call succe
        })
        .catch((error) => {
          this.movies = "Error! Could not reach the API. " + error;
        });
    },
  },

  /* created() {
    this.fetchMovies();
  }, */
  //watch: {
  // movieName: function (newName) {
  //   console.log(newName);
  // },
  //},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
  padding-top: 5rem;
  width: 10rem;
  height: 10rem;
  padding-bottom: 37rem;
  padding-left: 45rem;
}

/* ul {
  width: 100rem;
  display: inline-flex;
  align-content: center;
} */
h3 {
  margin: 40px 0 0;
}
</style>
