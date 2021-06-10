<template>
  <div class="film" v-if="movie !== null">
    <div class="affiche">
      <img :src="'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path" />
    </div>
    <div class="title">
      <h1 :title="movie.name">{{ movie.name }}</h1>
    </div>
  </div>
</template>

<script>
// import moment from "moment";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import axios from "axios";

export default {
  name: "Movie",
  data: function () {
    return {
      movie: null,
    };
  },
  methods: {
    formatDate: function (myDate) {
      return format(myDate, "d MMMM yyyy", { locale: fr });
    },
    fetchMovieDetails: function () {
      axios
        .get(`http://localhost:3000/movies/movie?id=${this.$route.params.id}`)
        .then((response) => {
          this.movie = response.data;
        })
        .catch((error) => {
          this.moviesLoadingError = "An error occured while fetching movies.";
          console.error(error);
        });
    },
  },
  created() {
    this.fetchMovieDetails();
  },
};
</script>

<style scoped>
.film {
  display: flex;
  width: 100%;
  height: auto;
  align-items: center;
  flex-direction: column;
  background-color: white;
  /* border-radius: 0.5rem; */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.404);
  transition: all 0.2s ease;
  overflow: hidden;
  position: relative;
  text-align: center;
}

.affiche {
  align-self: center;
}
.film img {
  width: 100%;
  height: auto;
}

.infos {
  height: 5rem;
  padding: 0 0.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.title {
  color:white;
}
h1 {
  color: white;
  font-size: 1rem;
  width: 100%;
  margin: auto;
  padding: 0 0.2rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

h3 {
  font-size: 0.8rem;
  margin: auto;
}

.film:hover {
  transform: scale(1.1);
  /* background-color: black;
  color: white; */
  transition: all 0.4s ease;
  z-index: 1;
}
</style>
