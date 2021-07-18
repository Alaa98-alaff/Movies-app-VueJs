<template>
  <section class="new-movies-container">
    <p class="new-movies-container__title">
      {{ similarMoviesObject.length !== 0 ? "Similar Movies" : "" }}
    </p>
    <div class="new-movies">
      <router-link
        v-for="movie in similarMoviesObject"
        :key="movie.id"
        :to="/search/ + movie.title + '/' + movie.id"
      >
        <div class="new-movie">
          <img
            class="new-movie__img"
            :src="baseImgUrl + movie.backdrop_path"
            :alt="movie.title"
          />
          <p class="new-movie__title">
            {{ movie.title.split(" ").slice(-2).join(" ") }}
          </p>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["movieId"],

  setup(props) {
    let selectedMovieID = ref(props.movieId);
    let similarMoviesObject = ref([]);
    let baseImgUrl = ref("https://image.tmdb.org/t/p/w500");

    async function renderSimilarMovies(id) {
      await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&page=1`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.results.length != 0) {
            similarMoviesObject.value = data.results.slice(0, 5);
          }
        });
    }

    renderSimilarMovies(selectedMovieID.value);

    return {
      selectedMovieID,
      renderSimilarMovies,
      similarMoviesObject,
      baseImgUrl,
    };
  },
};
</script>

<style lang="scss"></style>
