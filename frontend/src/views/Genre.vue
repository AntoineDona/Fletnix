<template>
  <div class="home">
    <h1>Genres</h1>
    <div class="popular" v-for="genre in genres" :key="genre">
      <h3>{{ genre }}</h3>
      <Slider :genre="genre" />
    </div>
    <div class="popular">
      <h3>Animation</h3>
      <Slider genre="Animation" />
    </div>
    <div class="popular">
      <h3>Comedy</h3>
      <Slider genre="Comedy" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Movie from "@/components/Movie.vue";
import Slider from "@/components/Slider.vue";
import axios from "axios";

export default {
  //j'exporte de mon fichier.
  name: "Home",
  components: {
    Slider,
  },
  data: function () {
    return {
      genres: [
        "Action",
        "Adventure",
        "Animation",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Family",
        "Fantasy",
        "History",
        "Horror",
        "Music",
        "Mystery",
        "Romance",
        "Science Fiction",
        "Thriller",
        "TV Movie",
        "War",
        "Western",
      ],
    };
  },
  methods: {
    fetchGenres: function () {
      axios
        .get(`https://www.themoviedb.org/genre/movie/list`)
        .then((response) => {
          this.genres = response.data;
          console.log("premier if");
        })
        .catch((error) => {
          this.moviesLoadingError = "An error occured while fetching movies.";
          console.error(error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
}

.popular {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90vw;
  margin: auto;
}

h1 {
  margin: 1rem;
}

h3 {
  color: white;
  margin-left: 2.2rem;
  margin-bottom: -1rem;
}

a {
  color: #42b983;
}
</style>
