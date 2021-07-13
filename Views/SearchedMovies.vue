<template>
  <HeaderComponent></HeaderComponent>
  <h1>Searched Movies Page</h1>
  <p v-for="movie in searhedMoviesArray">{{ movie.title }}</p>
</template>

<script>
import { ref, watch } from "vue";

import HeaderComponent from "../src/components/movieCard/Header.vue";

export default {
  components: { HeaderComponent },
  props: ["name"],

  setup(props) {
    let searhedMoviesArray = ref([]);

    async function fetchSearchedMovies(name) {
      // Cleaning the privious movies search
      searhedMoviesArray.value = [];

      await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&query=${name}`
      )
        .then((response) => response.json())
        .then((data) => {
          // filter the null movies
          data.results.forEach((movie) => {
            if (
              movie.vote_average != 0 &&
              movie.backdrop_path != null &&
              movie.vote_count > 100
            ) {
              searhedMoviesArray.value.push(movie);
            }
          });

          //   searhedMoviesArray.value = data.results;
          console.log(data);
        });

      console.log(searhedMoviesArray.value);
    }

    watch(
      () => props.name,
      (newValue) => fetchSearchedMovies(newValue)
    );

    fetchSearchedMovies(props.name);

    return { fetchSearchedMovies, searhedMoviesArray };
  },
};
</script>

<style></style>
