<template>
  <div class="film" v-if="movie !== null">
    <div class="affiche">
      <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" />
      <div class="like-dislike">
        <button @click="updateLike(1)" class="like">
          <i
            v-if="like == 0 || like == -1"
            class="far fa-thumbs-up"
            id="light-like"
          ></i>
          <i v-else-if="like == 1" class="fas fa-thumbs-up" id="dark-like"></i>
        </button>
        <button @click="updateLike(-1)" class="dislike">
          <i
            v-if="like == 0 || like == 1"
            class="far fa-thumbs-down"
            id="light-dislike"
          ></i>
          <i
            v-else-if="like == -1"
            class="fas fa-thumbs-down"
            id="dark-dislike"
          ></i>
        </button>
      </div>
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
        <h3 style="margin-right: 0.7rem">Genres:</h3>
        <div class="genres" v-for="genre of movie.genres" :key="genre.id">
          <h3>
            {{ genre.name }}
          </h3>
        </div>
        <div v-if="movie.runtime !== 0" class="separator"></div>
        <h3 v-if="movie.runtime !== 0" class="duree">
          {{ timeConvert(movie.runtime) }}
        </h3>
        <div v-if="movie.vote_average !== 0" class="separator"></div>
        <h3 v-if="movie.vote_average !== 0" class="duree">
          Note: {{ movie.vote_average }} /10
        </h3>
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
      like: 0,
    };
  },
  methods: {
    formatDate: function (myDate, Dateformat) {
      return format(myDate, Dateformat, { locale: fr });
    },
    fetchMovieDetails: function () {
      return axios
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
      var hours = num / 60;
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      return rhours + " h " + rminutes;
    },
    updateLike: function (like) {
      //update database
      //if like = prev_like -> on met 0: unlike
      //Sinon, newlike_id prend la valeur 1 (dislike) si false et 2 (like) sinon
      axios
        .post(
          `http://localhost:3000/stats/like?like=` +
            like +
            `&movie_id=${this.$route.params.id}`
        )
        .then(() => {
          this.like = like;
          console.log(this.like);
        })
        .catch((error) => {
          this.moviesLoadingError = "An error occured while fetching movies.";
          console.error(error);
        });
    },
    getLike: function () {
      //au lancement de la page on affiche le like
      axios
        .get(
          `http://localhost:3000/stats?movie_id=${this.$route.params.id}&param=like`
        )
        .then((response) => {
          if (response.data == null) {
            // console.log("like n'est pas encore défini");
            this.like = 0;
          } else {
            // console.log("like est déjà défini, on affiche");
            this.like = response.data.like;
          }
        })
        .catch((error) => {
          this.moviesLoadingError = "An error occured while fetching movies.";
          console.error(error);
        });
    },
  },
  created() {
    this.getLike();
    this.fetchMovieDetails();
  },
};

// const bgpath = "https://image.tmdb.org/t/p/w500/" + this.movie.backdrop_path;
</script>

<style scoped>
.film {
  display: flex;
  width: 80vw;
  margin: 3rem auto;
  height: 31rem;
  justify-content: space-around;
  align-items: center;
  background-color: #152d44;
  /* border: white solid 2px; */
  transition: all 0.2s ease;
  overflow: hidden;
  text-align: left;
}

.affiche {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  max-width: 20rem;
  align-self: center;
  align-items: center;
  overflow: hidden;
  border-radius: 1rem;
}

.affiche img {
  max-width: 100%;
  max-height: 25rem;
}

.like-dislike {
  display: flex;
  color: white;
  width: 100%;
  height: 3rem;
}

.like-dislike button {
  width: 50%;
  font-size: 1.4rem;
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
