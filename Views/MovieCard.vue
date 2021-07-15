<template>
  <div class="background">
    <!-- <img class="background__image" src="" alt="" /> -->
    <div class="content">
      <HeaderComponent></HeaderComponent>
      <MainComponent
        :searchedMovieID="incomeMovieID"
        :key="$route.params.id"
      ></MainComponent>
      <NewMoviesComponent></NewMoviesComponent>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import HeaderComponent from "../src/components/movieCard/HeaderComponent.vue";
import NewMoviesComponent from "../src/components/movieCard/NewMovies.vue";
import MainComponent from "../src/components/movieCard/MainMovie.vue";

export default {
  components: { HeaderComponent, NewMoviesComponent, MainComponent },

  setup() {
    let incomeMovieID = ref();

    // Movie ID Coming from Header ,and send as props to main
    function insertMovieIDToMainComp(data) {
      incomeMovieID.value = data;
    }

    return { insertMovieIDToMainComp, incomeMovieID };
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.background {
  background-color: $main-background-color;
  overflow: hidden;
  position: relative;

  &__image {
    filter: blur(8px);
    -webkit-filter: blur(8px);

    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}

.content {
  position: relative;
}
</style>
