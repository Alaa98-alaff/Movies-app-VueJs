import { createRouter, createWebHistory } from "vue-router";
import MovieCardComponent from "../src/components/movieCard/MovieCard.vue";
import SearchedMovies from "../Views/SearchedMovies.vue";
import SelectedMovie from "../Views/SelectedMovie.vue";

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
    props: true,
  },
  {
    path: "/search/:name",
    name: "Searched Movies",
    component: SearchedMovies,
    props: true,
  },
  {
    path: "/search/:name/:id",
    name: "Selected Movies",
    component: SelectedMovie,
    props: true,
  },
];

const routing = createRouter({
  history: createWebHistory(),
  routes,
});

export default routing;
