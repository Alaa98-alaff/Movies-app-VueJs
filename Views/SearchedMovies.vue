<template>
  <HeaderComponent></HeaderComponent>
  <main class="searhed-movies-main">
    <div class="searhed-movies-container">
      <div class="searched-movies-cards">
        <div v-for="movie in searhedMoviesArray" :key="movie.id">
          <div class="searched-movie-card">
            <img
              class="searched-movie-card__img"
              :src="baseImgUrl + movie.poster_path"
              :alt="movie.title"
            />
            <div class="title-continer">
              <p class="title-continer__title">{{ movie.title }}</p>
              <p class="title-continer__year">
                {{ movie.release_date?.split("-")[0] }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, watch } from "vue";

import HeaderComponent from "../src/components/movieCard/Header.vue";

export default {
  components: { HeaderComponent },
  props: ["name"],

  setup(props) {
    let searhedMoviesArray = ref([]);
    let baseImgUrl = ref("https://image.tmdb.org/t/p/w500");

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

    return { fetchSearchedMovies, searhedMoviesArray, baseImgUrl };
  },
};
</script>

<style lang="scss">
body {
  height: 100%;
  // min-height: 100vh;
}

.searhed-movies-main {
  height: 100%;
  // min-height: 100vh;
  background-color: $main-background-color;
}

.searched-movies-cards {
  display: flex;
  justify-content: center;
  flex-flow: wrap;
  padding-top: $searched-margin-top;
  margin-right: $searched-margin-right;
  margin-left: $searched-margin-left;
}

.searched-movie-card {
  width: 200px;
  height: 320px;
  background-color: #fff;
  margin-bottom: 110px;
  margin-right: 60px;

  &__img {
    height: 100%;
  }

  .title-continer {
    width: 213px;

    &__title {
      color: #fff;
      word-wrap: break-word;
      font-weight: 600;
      font-size: 15px;
    }

    &__year {
      color: #fff;
    }
  }
}
</style>
