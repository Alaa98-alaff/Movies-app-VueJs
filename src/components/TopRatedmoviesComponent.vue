<template>
  <div class="topRated-titleBox">
    <h1 class="topRated-titleBox__title">Top Rated Movies</h1>
    <i class="fas fa-arrow-up fa-2x"></i>
  </div>
  <main class="topRated-movies-main">
    <div class="topRated-movies-container">
      <div class="firstTop-movie">
        <img
          :src="baseImgUrl + firstTopMovie.poster_path"
          alt=""
          class="firstTop-movie__img"
        />
      </div>
      <div class="topRated-movies-cards">
        <div v-for="movie in topRatedMovies" :key="movie.id">
          <div
            class="topRated-movie-card"
            @click="getSelectedMovieID(movie.id)"
          >
            <img
              class="topRated-movie-card__img"
              :src="baseImgUrl + movie.poster_path"
              :alt="movie.title"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let topRatedMovies = ref([]);
    let firstTopMovie = ref({});
    let baseImgUrl = ref("https://image.tmdb.org/t/p/w500");

    async function getTopRatedMovies() {
      await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&page=1`
      )
        .then((response) => response.json())
        .then((data) => {
          topRatedMovies.value = data.results.slice(2, 8);
          firstTopMovie.value = data.results[1];
        });
    }

    getTopRatedMovies();
    return { topRatedMovies, baseImgUrl, getTopRatedMovies, firstTopMovie };
  },
};
</script>

<style lang="scss">
.topRated-titleBox {
  margin-left: 175px;
  margin-right: 175px;
  margin-top: 90px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  &__title {
    color: #fff;
    margin: 0;
    padding: 0;
    margin-right: 15px;
  }

  .fa-arrow-up {
    color: #fff;
  }
}

.topRated-movies-main {
  flex-direction: column;
  //   margin-top: 50px;
  display: flex;
  align-items: center;
}

.topRated-movies-container {
  display: flex;
  //   align-items: flex-start;
}

.firstTop-movie {
  margin-top: 10px;

  &__img {
    width: 320px;
    height: 542px;
  }
}

.topRated-movies-cards {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: wrap;
  width: 700px;
}

.topRated-movie-card {
  width: 200px;
  height: 260px;
  margin: 10px;

  &__img {
    width: 200px;
    height: 260px;
  }
}
</style>
