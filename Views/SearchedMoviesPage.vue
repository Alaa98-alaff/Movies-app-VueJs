<template>
  <HeaderComponent></HeaderComponent>
  <main class="searhed-movies-main">
    <div class="searhed-movies-container">
      <div class="searched-movies-cards">
        <div v-for="movie in searhedMoviesArray" :key="movie.id">
          <div
            class="searched-movie-card"
            @click="getSelectedMovieID(movie.id)"
          >
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

import routing from "../router/index";
import HeaderComponent from "../src/components/HeaderComponent.vue";

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
        });
    }

    watch(
      () => props.name,
      (newValue) => fetchSearchedMovies(newValue)
    );
    fetchSearchedMovies(props.name);

    // Get selected Movie ID To as params
    function getSelectedMovieID(id) {
      routing.push(`/search/${props.name}/${id}`);
    }

    return {
      fetchSearchedMovies,
      searhedMoviesArray,
      baseImgUrl,
      getSelectedMovieID,
    };
  },
};
</script>

<style lang="scss">
body {
  height: 100%;
}

.searhed-movies-main {
  height: 100%;
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
  width: 240px;
  height: 320px;
  background-color: #fff;
  margin-bottom: 110px;
  margin-right: 60px;
  cursor: pointer;

  :hover > &__img {
    opacity: 1;
    transition: opacity 0.2s;
  }

  &__img {
    height: 100%;
    width: 100%;
    opacity: 0.95;
    transition: opacity 0.5s;
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
