<template>
  <div class="home">
    <div class="search">
      <h1>Rechercher</h1>
      <div class="search_bar">
        <input
          @keyup.enter="onChange(movieName)"
          v-model="movieName"
          placeholder="Movie Research"
        />
        <button type="submit" class="search-btn">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>
    <div class="results">
      <div v-for="movie in movies" :key="movie.id" class="result_container">
        <MovieResult :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import MovieResult from "@/components/MovieResult.vue";
import axios from "axios";

export default {
  name: "Browse",
  components: {
    MovieResult,
  },
  data: function () {
    return {
      movieName: "",
      movies: {},
      usersLoadingError: "",
    };
  },
  watch: {
    // whenever question changes, this function will run
    movieName: function (newMovie) {
      if (newMovie.length == 0) {
        this.displayDefault();
      } else {
        this.getAnswer(newMovie);
      }
    },
  },
  methods: {
    // onChange: function (newMovie) {
    //   if (newMovie.length == 0) {
    //     this.displayDefault();
    //   } else {
    //     this.getAnswer(newMovie);
    //   }
    // },
    /* fetchMovies: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=57359ff087905e870d40ba4880a1dce0`
        )
        .then((response) => {
          this.movies = response.data.results;
          console.log(this.movies);
        })
        .catch((error) => {
          this.usersLoadingError = "An error occured while fetching movies.";
          console.error(error);
        });
    }, */
    getAnswer: function (newMovie) {
      // console.log(`http://localhost:3000/movies/search?name=${newMovie}`);
      axios
        // .get(
        //   `https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&language=fr&query=${newMovie}`
        // )
        .get(
          `http://localhost:3000/movies/search?name=${newMovie}&sort_by=popularity`
        )
        .then((response) => {
          if (newMovie.length == 0) {
            return { message: `Enter a movies name` };
          } else {
            // console.log(response.data);
            this.movies = response.data;
          }
          // Do something if call succe
        })
        .catch((error) => {
          this.movies = "Error! Could not reach the API. " + error;
        });
    },
    displayDefault: function () {
      axios
        .get(
          `http://localhost:3000/movies/?adult=false&sort_by=popularity&limit=20&status=Released`
        )
        .then((response) => {
          this.movies = response.data;
          console.log("premier if");
        })
        .catch((error) => {
          this.moviesLoadingError = "An error occured while fetching movies.";
          console.error(error);
        });
    },
  },

  created() {
    this.displayDefault();
  },
  //watch: {
  // movieName: function (newName) {
  //   console.log(newName);
  // },
  //},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
  min-height: 82vh;
}

h1 {
  font-size: 2rem;
}

h3 {
  margin: 40px 0 0;
}

.results {
  min-height: 30rem;
}

.search {
  margin: 2rem 0;
  display: flex;
  justify-content: center;
}

.search_bar {
  display: flex;
  margin-left: 1rem;
  width: auto;
  background-color: white;
  border: none;
  padding: 0.4rem 0.6rem;
  border-radius: 0.2rem;
  flex-wrap: nowrap;
}

.search_bar input {
  width: 15rem;
  border: none;
  outline: none;
}

.search-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
</style>
