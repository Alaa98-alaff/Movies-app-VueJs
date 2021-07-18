<template>
  <Carousel :settings="settings" :breakpoints="breakpoints" class="movies-bar">
    <div v-for="movie in sortedMovies" :key="movie.id" class="movie-card">
      <router-link :to="'/search/' + movie.title + '/' + movie.id">
        <img
          class="movie-card__img"
          :src="imgBaseUrl + movie.poster_path"
          alt=""
        />
      </router-link>
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
  margin-left: $silde-margin-left;
  margin-right: $silde-margin-right;
  margin-bottom: 70px;
}

.movie-card {
  width: 202px;
  height: 340px;
  margin: 7.5px;
  cursor: pointer;
  opacity: 0.9;
  transition: opacity 0.4s;

  &:hover {
    opacity: 1;
    transition: opacity 0.4s;
  }

  &__img {
    width: 202px;
    height: 340px;
    transition: all 300ms ease-in-out;
    object-fit: cover;

    &:hover,
    &:focus {
      transform: scale(0.98);
    }
  }
}

.nav-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;

  &:active {
    background-color: rgb(12, 22, 66);
  }
}
</style>
