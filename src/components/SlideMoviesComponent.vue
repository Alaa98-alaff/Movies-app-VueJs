<template>
  <Carousel :settings="settings" :breakpoints="breakpoints" class="movies-bar">
    <div v-for="movie in sortedMovies" :key="movie.id" class="movie-card">
      <img
        class="movie-card__img"
        :src="imgBaseUrl + movie.poster_path"
        alt=""
      />
    </div>

    <template #addons>
      <Pagination />
      <Navigation />
    </template>
  </Carousel>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default defineComponent({
  name: "ExamplePagination",
  props: ["sortedMovies", "imgBaseUrl"],

  components: {
    Pagination,
    Carousel,
    Slide,
    Navigation,
  },

  data: () => ({
    // carousel settings
    settings: {
      itemsToShow: 1,
      snapAlign: "center",
    },
    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    breakpoints: {
      // 700px and up
      700: {
        itemsToShow: 3.5,
        snapAlign: "center",
      },
      // 1024 and up
      1024: {
        itemsToShow: 5,
        snapAlign: "start",
      },
    },
  }),
});
</script>

<style lang="scss">
.movies-bar {
  height: 400px;
}

.movie-card {
  width: 265px;
  height: 400px;

  &__img {
    width: 265px;
    height: 400px;
  }
}
</style>
