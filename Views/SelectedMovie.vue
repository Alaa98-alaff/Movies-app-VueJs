<template>
  <h1>{{ selectedMovieDetails.title }}</h1>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["name", "id"],

  setup(props) {
    let selectedMovieDetails = ref({});

    async function getSelectedMovieDetails(id) {
      await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      )
        .then((response) => response.json())
        .then((data) => (selectedMovieDetails.value = data));
    }
    getSelectedMovieDetails(props.id);

    return { getSelectedMovieDetails, selectedMovieDetails };
  },
};
</script>

<style></style>
