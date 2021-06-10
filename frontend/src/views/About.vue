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
  <Carousel :itemsToShow="6.5" :wrapAround="true" :currentSlide="10">
    <Slide v-for="movie in movies" :key="movie">
      <Movie :movie="movie" />
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Movie from "@/components/Movie.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
  //j'exporte de mon fichier.
  name: "About",
  components: {
    Movie,
    Carousel,
    Slide,
    Pagination,
    Navigation,
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
