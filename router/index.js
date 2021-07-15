import { createRouter, createWebHistory } from "vue-router";
import MovieCardComponent from "../Views/MovieCard.vue";
import SearchedMovies from "../Views/SearchedMoviesComponent.vue";
import SelectedMovie from "../Views/SelectedMovieComponent.vue";
import MainMovieComponent from "../Views/MainMovie.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: MainMovieComponent,
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
