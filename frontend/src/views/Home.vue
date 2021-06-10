<template>
  <div class="home">
    <div class="hero">
      <div class="txt-color">
        <h1>BIENVENUE</h1>
      </div>
    </div>
    <div class="popular">
      <h3>Popular</h3>
      <!-- <input v-model="movieName" placeholder="edit me" />
    <p>Message is: {{ movieName }}</p> -->
      <!-- <ul id="array-rendering">
      <li v-for="movie in movies" :key="movie.id">
        <Movie :movie="movie" />
      </li>
    </ul> -->
      <Slider />
    </div>
    <div class="popular">
      <h3>Last Release</h3>
      <Slider />
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
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0, 0, 5px, 20px, red);
}

.hero h1 {
  font-family: "BebasNeue";
  letter-spacing: 1rem;
  font-size: 8rem;
  margin: 2rem 0;
  color: white;
  text-shadow: 4px 4px 2px rgb(0, 0, 0);
  /* text-shadow: 4px 4px 2px rgb(255, 0, 0); */
  /* background-color: #000000; */
  /* background-color: #152d44;
  color: transparent; */
  /* text-shadow:1px -1px rgba(0, 0, 0, .2); */
  /* text-shadow: 3px 3px 1px rgb(255, 255, 255); */
  /* -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text; */
  /* box-shadow: 0 0 0  #152d44;
  box-shadow: -10px -10px 0  #188fff; */
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

.popular {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90vw;
  margin: auto;
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
