<template>
  <div class="home">
    <h1>Genres</h1>
    <div class="popular" v-for="genre in genres" :key="genre">
      <h3>
        <router-link :to="'/genre/' + lowerFirstLetter(genre)">{{
          genre
        }}</router-link>
      </h3>

      <Slider :genre="genre" :lower_genre="lowerFirstLetter(genre)" />
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
    lowerFirstLetter: function (string) {
      return string.charAt(0).toLowerCase() + string.slice(1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
  overflow: hidden;
}

.popular {
  display: flex;
  width: 98vw;
  flex-direction: column;
  align-items: flex-start;
  margin: auto;
}

h1 {
  margin: 1rem;
}

h3 {
  color: white;
  height: auto;
  margin-left: 2.5rem;
  margin-bottom: -1rem;
}

a {
  color: white;
  height: 1rem;
  margin-bottom: -1rem;
  text-decoration-color: white;
}
</style>
