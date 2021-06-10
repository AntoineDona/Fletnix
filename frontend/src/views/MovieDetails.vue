<template>
  <div style="height: 35rem; display: flex; flex align: center;">
    <div class="film" v-if="movie !== null">
      <div class="affiche">
        <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" />
      </div>
      <div class="aside">
        <h1 :title="movie.name">
          {{
            movie.name + " (" + formatDate(new Date(movie.release_date)) + ")"
          }}
        </h1>
        <div class="description">
          {{ movie.overview }}
        </div>
      </div>
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
      return format(myDate, "yyyy", { locale: fr });
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

// const bgpath = "https://image.tmdb.org/t/p/w500/" + this.movie.backdrop_path;
</script>

<style scoped>
.film {
  display: flex;
  width: 80vw;
  margin: auto;
  height: 30rem;
  align-items: center;
  background-color: #152d44;
  /* border: white solid 2px; */
  transition: all 0.2s ease;
  overflow: hidden;
  text-align: left;
}

.aside {
  flex-basis: 70%;
  margin-left: 5rem;
}

.affiche {
  height: 100%;
  width: auto;
  align-self: center;
  overflow: hidden;
}
.affiche img {
  height: 100%;
  width: auto;
  border-radius: 1rem;
}

.description {
  margin-top: 2rem;
  color: white;
}
.infos {
  height: 5rem;
  padding: 0 0.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.title {
  color: white;
}
h1 {
  color: white;
  font-size: 2rem;
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
</style>
