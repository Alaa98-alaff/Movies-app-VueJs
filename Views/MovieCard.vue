<template>
  <div class="background">
    <div class="content">
      <MainComponent
        :searchedMovieID="incomeMovieID"
        :key="$route.params.id"
      ></MainComponent>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import HeaderComponent from "../src/components/movieCard/HeaderComponent.vue";
import NewMoviesComponent from "../src/components/movieCard/NewMoviesComponent.vue";
import MainComponent from "../Views/MainMovie.vue";

export default {
  components: { NewMoviesComponent, MainComponent },

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
  // background-color: $main-background-color;
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
