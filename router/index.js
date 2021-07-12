import { createRouter, createWebHistory } from "vue-router";
import MovieCardComponent from "../src/components/movieCard/MovieCard.vue";
import CurrentMovieComponent from "../Views/CurrentMovie.vue";

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
];

const routing = createRouter({
  history: createWebHistory(),
  routes,
});

export default routing;
