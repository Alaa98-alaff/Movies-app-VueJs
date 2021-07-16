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
      <Navigation class="nav-icon" />
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
  height: 340px;
  margin-left: 90px;
  margin-right: 90px;
}

.movie-card {
  width: 222px;
  height: 340px;
  margin: 6px;

  &__img {
    width: 222px;
    height: 340px;
  }
}

.nav-icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
</style>
