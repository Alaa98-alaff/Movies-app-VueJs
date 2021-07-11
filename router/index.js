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
    path: "/movie",
    name: "Current Movie",
    component: CurrentMovieComponent,
  },
];

const routing = createRouter({
  history: createWebHistory(),
  routes,
});

export default routing;
