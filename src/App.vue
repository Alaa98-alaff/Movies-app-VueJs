<template>
  <!-- <HeaderComponent></HeaderComponent>
  <new-movies></new-movies> -->
  <MovieCard></MovieCard>
</template>

<script>
import { useRoute } from "vue-router";
import HeaderComponent from "./components/Header.vue";
import NewMovies from "./components/NewMovies.vue";
import MovieCard from "./components/MovieCard.vue";

export default {
  components: { HeaderComponent, NewMovies, MovieCard },
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
