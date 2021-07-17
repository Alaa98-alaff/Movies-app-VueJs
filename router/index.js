import { createRouter, createWebHistory } from "vue-router";
import SearchedMoviesPage from "../Views/SearchedMoviesPage.vue";
import SelectedMoviePage from "../Views/SelectedMoviePage.vue";
import MainPage from "../Views/MainPage.vue";
import AllTopRatedMoviesPage from "../Views/AllTopRatedMoviesPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: MainPage,
    props: true,
  },
  {
    path: "/search/:name",
    name: "Searched Movies",
    component: SearchedMoviesPage,
    props: true,
  },
  {
    path: "/search/:name/:id",
    name: "Selected Movies",
    component: SelectedMoviePage,
    props: true,
  },
  {
    path: "/top-rated-movies",
    name: "Top Rated Movies Movies",
    component: AllTopRatedMoviesPage,
    props: true,
  },
];

const routing = createRouter({
  history: createWebHistory(),
  routes,
});

export default routing;
