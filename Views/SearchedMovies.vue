<template>
  <HeaderComponent></HeaderComponent>
  <h1>Searched Movies Page</h1>
  <p>{{ name }}</p>
</template>

<script>
import { ref, watchEffect, watch } from "vue";
import { useRoute } from "vue-router";

import HeaderComponent from "../src/components/movieCard/Header.vue";

export default {
  components: { HeaderComponent },
  props: ["name"],

  setup(props) {
    let route = useRoute();
    let routeParamsName = ref(route.params.name);

    async function fetchSearchedMovies(name) {
      await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&query=${name}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    }

    watch(
      () => props.name,
      (newValue) => fetchSearchedMovies(newValue)
    );

    fetchSearchedMovies(props.name);

    return { fetchSearchedMovies, routeParamsName };
  },
};
</script>

<style></style>
