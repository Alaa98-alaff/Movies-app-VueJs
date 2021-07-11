<template>
  <div class="background">
    <!-- <img class="background__image" src="" alt="" /> -->
    <div class="content">
      <HeaderComponent @SearchData="insertDataToChild"></HeaderComponent>
      <!-- <MainComponent></MainComponent> -->
      <NewMoviesComponent></NewMoviesComponent>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import HeaderComponent from "./Header.vue";
import NewMoviesComponent from "./NewMovies.vue";
import MainComponent from "./MainMovie.vue";

export default {
  components: { HeaderComponent, NewMoviesComponent, MainComponent },

  setup() {
    let incomeMovieData = ref({});

    function insertDataToChild(data) {
      console.log(data);
    }

    console.log(incomeMovieData.value, "TEST");
    return { insertDataToChild, incomeMovieData };
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
}
.background {
  background-color: rgb(56, 50, 50);
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
