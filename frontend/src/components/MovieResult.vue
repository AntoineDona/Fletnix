<template>
  <div class="film" v-if="movie !== null">
    <div class="top">
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
          <div v-if="movie.vote_average !== 0" class="separator"></div>
          <h3 v-if="movie.vote_average !== 0" class="duree">
            Note: {{ movie.vote_average }} /10
          </h3>
        </div>
        <div class="description">
          <div class="synopsis">
            {{ movie.overview }}
          </div>
        </div>
      </div>
    </div>
    <router-link
      :to="'/movies/' + movie._id"
      style="margin-top: -1rem; margin-bottom: -0.5rem"
    >
      <button>En savoir plus</button>
    </router-link>
  </div>
</template>

<script>
// import moment from "moment";
import { fr } from "date-fns/locale";
import { format } from "date-fns";

export default {
  name: "MovieResult",
  props: {
    movie: Object,
  },
  methods: {
    formatDate: function (myDate, Dateformat) {
      if (
        this.movie.release_date == "" ||
        this.movie.release_date == null ||
        this.movie.release_date == undefined
      ) {
        return "no date";
      }
      return format(myDate, Dateformat, { locale: fr });
    },
  },
  created() {},
};
</script>

<style scoped>
.film {
  display: flex;
  width: 75vw;
  margin: 1rem auto;
  padding: 1rem;
  /* height: 31rem; */
  justify-content: space-around;
  align-items: center;
  background-color: #1d3e5e;
  border-radius: 1rem;
  /* border: white solid 2px; */
  transition: all 0.2s ease;
  overflow: hidden;
  text-align: left;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.411);
  flex-wrap: wrap;
}

.top {
  display: flex;
  width: 100%;
  margin: auto;
  justify-content: space-around;
  align-items: center;
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
  max-height: 10rem;
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
  height: 100%;
  margin-left: 1rem;
  overflow: hidden;
}

.sous_infos {
  margin-top: 0.8rem;
  color: white;
  display: flex;
  justify-content: left;
  align-items: center;
}

.sous_infos h3 {
  margin: unset;
}

.description {
  margin-top: 0.8rem;
  color: white;
}

.description h2 {
  margin-bottom: 0.75rem;
}

.description a {
  display: block;
  margin: auto;
  margin-top: -0.5rem;
  margin-bottom: -1rem;
  text-align: center;
}

.synopsis {
  font-size: 0.7rem;
  line-height: 1rem;
  position: relative;
  max-height: 4rem;
  overflow: hidden;
  /* text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden; */
}
.synopsis:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  height: 50%;
  width: 100%;
  background: linear-gradient(#1d3e5e5d, #1d3e5e);
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
  font-size: 1.1rem;
  width: 100%;
  margin: auto;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

h2 {
  color: white;
  font-size: 0.8rem;
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

button {
  background: none;
  padding: 0.3rem 0;
  width: 10rem;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  border: solid white 2px;
  border-radius: 1rem;
  transition: all 0.4s ease;
  margin-top: -0.5rem;
  margin-bottom: -1rem;
}

button:hover {
  background-color: white;
  transition: all 0.4s ease;
  cursor: pointer;
  color: #1d3e5e;
}

a {
  text-decoration: none;
}
</style>
