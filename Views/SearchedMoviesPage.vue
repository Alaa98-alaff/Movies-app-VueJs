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
    window.scrollTo(0, 0);

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
  display: flex;
  justify-content: center;
  align-items: center;
}

.searched-movies-cards {
  width: 1000px;
  display: flex;
  justify-content: center;
  flex-flow: wrap;
  padding-top: $searched-margin-top;

  @include respond(phone) {
    width: 500px;
    margin-top: -28px;
  }
}

.searched-movie-card {
  width: 240px;
  height: 320px;
  background-color: #fff;
  margin-bottom: 110px;
  margin-right: 60px;
  cursor: pointer;

  transition: all 300ms ease-in-out;
  object-fit: cover;

  &:hover,
  &:focus {
    transform: scale(0.98);
  }

  @include respond(phone) {
    margin-right: 0px;
    width: 130px;
    height: 160px;
    margin: 30px 20px;
  }

  &__img {
    height: 100%;
    width: 100%;

    @include respond(phone) {
      width: 130px;
      height: 180px;
    }
  }

  .title-continer {
    &__title {
      color: #fff;
      word-wrap: break-word;
      font-size: 15px;
      margin: 0;
      padding: 0;

      @include respond(phone) {
        font-size: 9.5px;
        margin-top: -6px;
        width: 130px;
      }
    }

    &__year {
      color: #fff;
      margin: 0;
      padding: 0;

      @include respond(phone) {
        font-size: 7px;
        color: rgb(175, 164, 164);
      }
    }
  }
}
</style>
