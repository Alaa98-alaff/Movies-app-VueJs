<template>
  <!-- <HeaderComponent></HeaderComponent>
  <new-movies></new-movies> -->
  <MovieCard></MovieCard>
</template>

<script>
import { useRoute } from "vue-router";

import MovieCard from "./components/movieCard/MovieCard.vue";

export default {
  components: { MovieCard },
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
