<template>
  <router-link :to="'/movies/' + movie._id">
    <div class="film">
      <!-- <div class="affiche"> -->
      <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" />
      <!-- </div> -->
      <!-- <div class="title">
      <h1 :title="movie.name">{{ movie.name }}</h1>
    </div> -->
      <!-- <h3>
        {{ moment(new Date(movie.release_date)).format("D MMMM YYYY") }}
        {{ formatDate(new Date(movie.release_date)) }}
      </h3> -->
      <!-- <p>{{ movie.overview }}</p> -->
    </div>
  </router-link>
</template>

<script>
// import moment from "moment";
import { fr } from "date-fns/locale";
import { format } from "date-fns";

export default {
  name: "Movie",
  props: {
    movie: Array,
  },
  methods: {
    formatDate: function (myDate) {
      return format(myDate, "d MMMM yyyy", { locale: fr });
    },
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
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 2rem;
  background-color: rgba(0, 0, 0, 0.377);
  display: flex;
  align-items: center;
  justify-content: center;
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
