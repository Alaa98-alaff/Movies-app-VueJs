import { createRouter, createWebHistory } from "vue-router";
import MovieCardComponent from "../src/components/movieCard/MovieCard.vue";
import SearchedMovies from "../Views/SearchedMovies.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: MovieCardComponent,
  },
  {
    path: "/new-movie/:id",
    name: "Current Movie",
    component: MovieCardComponent,
  },
  {
    path: "/search/:name",
    name: "Searched Movies",
    component: SearchedMovies,
  },
];

const routing = createRouter({
  history: createWebHistory(),
  routes,
});

export default routing;
