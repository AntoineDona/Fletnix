<template>
  <div class="film">
    <div class="affiche">
      <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" />
    </div>
    <div class="infos">
      <h1>{{ movie.title }}</h1>
      <h3>
        <!-- {{ moment(new Date(movie.release_date)).format("D MMMM YYYY") }} -->
        {{ formatDate(new Date(movie.release_date)) }}
      </h3>
      <!-- <p>{{ movie.overview }}</p> -->
    </div>
  </div>
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
  width: 13rem;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border: solid 1px rgba(0, 0, 0, 0.068);
  border-radius: 0.5rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.404);
  margin: 1rem 1rem;
  transition: all 0.2s ease;
}

.affiche {
  align-self: center;
}
.affiche img {
  width: 100%;
  border-radius: 0.5rem;
}

.infos {
  height: 5rem;
  padding: 0 0.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
}

h1 {
  font-size: 1rem;
  height: 2.4rem;
  width: 12rem;
  margin: auto;
  padding: 0 0.4rem;
  text-overflow: ellipsis;
  overflow: hidden;
}

h3 {
  font-size: 0.8rem;
  margin: auto;
}

.film:hover {
  width: 13.5rem;
  /* background-color: black;
  color: white; */
  transition: all 0.4s ease;
}
</style>
