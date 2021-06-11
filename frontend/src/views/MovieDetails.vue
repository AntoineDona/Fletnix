<template>
  <div class="film" v-if="movie !== null">
    <div class="affiche">
      <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" />
    </div>
    <div class="aside">
      <h1 :title="movie.name">
        {{
          movie.name +
          " (" +
          formatDate(new Date(movie.release_date), "yyyy") +
          ")"
        }}
      </h1>
      <div class="sous_infos">
        <h3>{{ formatDate(new Date(movie.release_date), "d MMMM yyyy") }}</h3>
        <div class="separator"></div>
        <div class="genres" v-for="genre of movie.genres" :key="genre.id">
          <h3>
            {{ genre.name }}
          </h3>
          <div class="separator"></div>
        </div>
        <h3 class="duree">{{ timeConvert(movie.runtime) }}</h3>
        <div class="separator"></div>
      </div>
      <div class="description">
        <h2>Synopsis</h2>
        <div>
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
    formatDate: function (myDate, Dateformat) {
      return format(myDate, Dateformat, { locale: fr });
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
    timeConvert: function (n) {
      var num = n;
      console.log(n);
      var hours = num / 60;
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      return rhours + " h " + rminutes;
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
  height: 37rem;
  justify-content: space-around;
  align-items: center;
  background-color: #152d44;
  /* border: white solid 2px; */
  transition: all 0.2s ease;
  overflow: hidden;
  text-align: left;
}

.aside {
  flex-basis: 60vw;
  margin-left: 2rem;
  overflow: hidden;
}

.sous_infos {
  margin-top: 1rem;
  color: white;
  display: flex;
  justify-content: left;
  align-items: center;
}

.sous_infos h3 {
  margin: unset;
}

.affiche {
  display: flex;
  border-radius: 1rem;
  flex-basis: 30%;
  height: 100%;
  align-self: center;
  align-items: center;
  overflow: hidden;
}

.affiche img {
  width: 100%;
  border-radius: 1rem;
}

.description {
  margin-top: 2rem;
  color: white;
}

.description h2 {
  margin-bottom: 0.75rem;
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

h2 {
  color: white;
}

h3 {
  font-size: 0.8rem;
  margin: auto;
}

.genres {
  display: flex;
  align-items: center;
}

.separator {
  width: 5px;
  height: 5px;
  background-color: white;
  border-radius: 50%;
  margin: 0 0.5rem;
}
</style>
