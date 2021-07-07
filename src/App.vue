<template>
  <HeaderComponent></HeaderComponent>
  <MainMovieComponent></MainMovieComponent>
</template>

<script>
import { useRoute } from "vue-router";
import HeaderComponent from "./components/Header.vue";
import MainMovieComponent from "./components/MainMovie.vue";
export default {
  components: { HeaderComponent, MainMovieComponent },
  setup() {
    let route = useRoute();
    return { route };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap");
* {
  font-family: $font-family;
}
</style>
