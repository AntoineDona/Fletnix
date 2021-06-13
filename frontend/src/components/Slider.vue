<template>
  <Swiper
    :slidesPerView="6"
    :spaceBetween="5"
    :slidesPerGroup="4"
    :navigation="true"
    class="mySwiper"
  >
    <SwiperSlide v-for="movie in movies" :key="movie.id">
      <Movie :movie="movie" />
    </SwiperSlide>

    <SwiperSlide>
      <div class="see_more">
        <router-link v-if="genre !== undefined" :to="'/genre/' + lower_genre"
          >Voir plus</router-link
        >
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script>
import Movie from "@/components/Movie.vue";
import axios from "axios";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/swiper.scss";

import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from "swiper/core";

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

export default {
  name: "Slider",
  props: {
    sort_by: String,
    status: String,
    genre: String,
    lower_genre: String,
  },
  components: {
    Swiper,
    SwiperSlide,
    Movie,
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
      // console.log(this.status);
      if (this.sort_by !== undefined) {
        axios
          .get(
            `http://localhost:3000/movies/?adult=false&sort_by=` +
              this.sort_by +
              `&limit=20&status=` +
              this.status
          )
          .then((response) => {
            this.movies = response.data;
            console.log("premier if");
          })
          .catch((error) => {
            this.moviesLoadingError = "An error occured while fetching movies.";
            console.error(error);
          });
      } else if (this.genre !== undefined) {
        console.log("2e if");
        console.log(this.genre);
        console.log(
          `http://localhost:3000/movies/genre/?name=` + this.genre + `&limit=20`
        );
        axios
          .get(
            `http://localhost:3000/movies/genre/?name=` +
              this.genre +
              `&limit=20`
          )
          .then((response) => {
            this.movies = response.data;
            console.log(this.movies);
          })
          .catch((error) => {
            this.moviesLoadingError = "An error occured while fetching movies.";
            console.error(error);
          });
      }
    },
  },
  created() {
    this.fetchMovies();
  },
};
</script>

<style scoped>
.swiper-container {
  margin: 1rem auto;
  padding: 1rem;
  width: 90vw;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  /* background: #fff; */

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.see_more {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: white;
}

.see_more a {
  color: #152d44;
  background-color: white;
  text-decoration: none;
  border: solid white 1px;
  padding: 0.5rem;
  font-weight: bolder;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
