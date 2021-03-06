import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import MovieDetails from "../views/MovieDetails.vue";
import Users from "../views/Users.vue";
import Add from "../views/Add.vue";
import Browse from "../views/Browse.vue";
import About from "../views/About.vue";
import Genre from "../views/Genre.vue";
import FullList from "../views/FullList.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/movies/:id",
    name: "MovieDetails",
    component: MovieDetails,
  },
  {
    path: "/browse",
    name: "Browse",
    component: Browse,
  },
  {
    path: "/genre",
    name: "Genre",
    component: Genre,
  },
  {
    path: "/genre/:genre",
    name: "FullGenreList",
    component: FullList,
  },
  {
    path: "/sort_by/:sort_by",
    name: "FullSortedList",
    component: FullList,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/users",
    name: "Users",
    component: Add,
  },
  {
    path: "/search/:name",
    name: "Search",
    component: Search,
  },
];

// router.get("/movies", function (req, res) {
//   console.log(req.query);
//   movieModel
//     .find({})
//     .limit(parseInt(req.query.limit))
//     .sort("-" + req.query.sort_by)
//     .select(
//       "_id name release_date original_language overview poster_path backdrop_path status vote_average vote_count"
//     )
//     .then(function (movies) {
//       res.json(movies);
//       console.log("ok");
//     });
// });

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
