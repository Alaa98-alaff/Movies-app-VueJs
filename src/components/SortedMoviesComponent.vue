<template>
  <button @click="findPopularMovies">Populars</button>
  <button @click="findActionMovies">Action</button>
  <SlideMoviesComponent
    :sortedMovies="movieArr"
    :imgBaseUrl="baseImgUrl"
  ></SlideMoviesComponent>
</template>

<script>
import { ref } from "vue";
import SlideMoviesComponent from "./SlideMoviesComponent.vue";

export default {
  components: { SlideMoviesComponent },

  setup() {
    let movieArr = ref();
    let baseImgUrl = ref("https://image.tmdb.org/t/p/w500");

    async function findPopularMovies() {
      await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&sort_by=popularity.desc`
      )
        .then((response) => response.json())
        .then((data) => {
          movieArr.value = data.results;
          console.log(movieArr.value);
          console.log(data);
        });
    }
    findPopularMovies();

    async function findActionMovies() {
      await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&with_genres=28`
      )
        .then((response) => response.json())
        .then((data) => {
          movieArr.value = data.results;
          console.log(data);
        });
    }

    return { findPopularMovies, findActionMovies, movieArr, baseImgUrl };
  },
};
</script>

<style lang="scss"></style>
