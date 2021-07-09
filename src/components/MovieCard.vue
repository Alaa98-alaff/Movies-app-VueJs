<template>
  <div class="background">
    <img
      class="background__image"
      src="https://images.hdqwalls.com/wallpapers/fast-and-furious-9-the-fast-saga-2020-movie-i5.jpg"
      alt=""
    />
    <div class="content">
      <HeaderComponent></HeaderComponent>
      <!-- <MainMovieComponent></MainMovieComponent> -->
      <NewMovies></NewMovies>
    </div>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
}
.background {
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

<script>
import HeaderComponent from "./Header.vue";
import NewMovies from "./NewMovies.vue";

export default {
  components: { HeaderComponent, NewMovies },
  setup() {
    return {};
  },
};
</script>
