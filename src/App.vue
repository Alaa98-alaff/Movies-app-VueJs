<template>
  <!-- <HeaderComponent></HeaderComponent>
  <new-movies></new-movies> -->
  <!-- <MovieCard></MovieCard> -->
  <!-- <HeaderComponent /> -->
  <router-view />
</template>

<script>
import { useRoute } from "vue-router";

import HeaderComponent from "./components/movieCard/HeaderComponent.vue";
import MovieCard from "../Views/MovieCard.vue";

export default {
  components: { MovieCard, HeaderComponent },
  setup() {
    return {};
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap");
* {
  font-family: $font-family;
}
</style>
