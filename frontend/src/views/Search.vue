<template>
  <h1>Top results for {{}}</h1>
</template>

<script>
import axios from "axios";
export default {
  name: "Search",
  data: function () {
    return {
      counter: 0,
      movies: [],
    };
  },
  methods: {
    fetchMovies: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=57359ff087905e870d40ba4880a1dce0&${this.$route.params.name}`
        )
        .then((response) => {
          this.movies = response.data.results;
        })
        .catch((error) => {
          this.usersLoadingError = "An error occured while fetching movies.";
          console.error(error);
        });
    },
  },
  created() {
    this.fetchMovies();
  },
};
</script>

<style scoped>
.counter-value {
  margin-bottom: 5px;
}
</style>
