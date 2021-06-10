<template>
  <MovieDetails :movie="movie" />
</template>

<script>
// @ is an alias to /src
import MovieDetails from "@/views/MovieDetails.vue";
import axios from "axios";

export default {
  name: "Users",
  components: {
    MovieDetails,
  },
  data: function () {
    return {
      movie: {},
      movieLoadingError: "",
    };
  },
  methods: {
    fetchMovie: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/337404?api_key=57359ff087905e870d40ba4880a1dce0`
        )
        .then((response) => {
          this.movie = response.data.results;
          console.log(this.movie);
        })
        .catch((error) => {
          this.movieLoadingError = "An error occured while fetching movies.";
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
