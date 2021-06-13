<template>
  <div class="home">
    <div class="search">
      <h1 v-if="this.$route.params.genre !== undefined">
        {{ upperFirstLetter(this.$route.params.genre) }}
      </h1>
      <h1 v-else-if="this.$route.params.sort_by !== undefined">
        {{ upperFirstLetter(this.$route.params.sort_by) }}
      </h1>
    </div>
    <div class="results">
      <div v-for="movie in movies" :key="movie.id" class="result_container">
        <MovieResult :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import MovieResult from "@/components/MovieResult.vue";
import axios from "axios";

export default {
  name: "Browse",
  components: {
    MovieResult,
  },
  data: function () {
    return {
      movieName: "",
      movies: {},
      usersLoadingError: "",
    };
  },
  methods: {
    fetchMovies: function () {
      // console.log(this.status);
      if (this.$route.params.sort_by !== undefined) {
        axios
          .get(
            `http://localhost:3000/movies/?adult=false&sort_by=` +
              this.$route.params.sort_by +
              `&limit=40&status=Released`
          )
          .then((response) => {
            this.movies = response.data;
          })
          .catch((error) => {
            this.moviesLoadingError = "An error occured while fetching movies.";
            console.error(error);
          });
      } else if (this.$route.params.genre !== undefined) {
        console.log("lien par genre");
        // console.log(this.genre);
        // console.log(
        //   `http://localhost:3000/movies/genre/?name=` + this.genre + `&limit=20`
        // );
        axios
          .get(
            `http://localhost:3000/movies/genre/?name=` +
              this.upperFirstLetter(this.$route.params.genre) +
              `&limit=40&status=Released`
          )
          .then((response) => {
            this.movies = response.data;
            // console.log(this.movies);
          })
          .catch((error) => {
            this.moviesLoadingError = "An error occured while fetching movies.";
            console.error(error);
          });
      }
    },
    upperFirstLetter: function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
  created() {
    this.fetchMovies();
  },
};
</script>

<style>
.home {
  text-align: center;
}

.search h1{
    margin: 1rem;
}
</style>
