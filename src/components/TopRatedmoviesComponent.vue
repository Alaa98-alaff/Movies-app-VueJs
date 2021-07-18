<template>
  <div class="topRated-title">
    <div class="titleBox">
      <h1 class="titleBox__title">Top Rated Movies</h1>
      <i class="fas fa-arrow-up fa-2x"></i>
    </div>
    <router-link class="router-link" to="/top-rated-movies">
      <div class="view-all">
        <p class="view-all__title">View All</p>
        <i class="fas fa-arrow-right"></i>
      </div>
    </router-link>
  </div>
  <main class="topRated-movies-main">
    <div class="topRated-movies-container">
      <router-link
        :to="'/search/' + firstTopMovie.title + '/' + firstTopMovie.id"
      >
        <div class="firstTop-movie">
          <img
            :src="baseImgUrl + firstTopMovie.poster_path"
            alt=""
            class="firstTop-movie__img"
          />
        </div>
      </router-link>
      <div class="topRated-movies-cards">
        <div v-for="movie in topRatedMovies" :key="movie.id">
          <router-link :to="'/search/' + movie.title + '/' + movie.id">
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
          </router-link>
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
.topRated-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 172px;
  width: 995px;
  margin-top: 105px;

  @include respond(phone) {
    width: 365px;
    margin-left: 5px;
    font-size: 60%;
  }

  .view-all {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $grey-color;
    cursor: pointer;
    font-size: 20px;

    @include respond(phone) {
      font-size: 13px;
    }

    &:hover {
      color: rgb(192, 79, 79);
    }

    &:active {
      color: rgb(87, 43, 43);
    }

    &__title {
      margin-right: 5px;
    }
  }
}

.titleBox {
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
  //   flex-direction: column;
  //   display: flex;
  //   align-items: center;
  //   margin-left: 30px;
}

.topRated-movies-container {
  display: flex;
  margin-left: 175px;

  @include respond(phone) {
    margin-left: 15px;
  }
}

.firstTop-movie {
  margin-top: 10px;

  &__img {
    width: 320px;
    height: 560px;

    @include respond(phone) {
      width: 150px;
      height: 350px;
    }
  }
}

.topRated-movies-cards {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: wrap;
  width: 700px;
  margin-bottom: 40px;
}

.topRated-movie-card {
  width: 200px;
  height: 270px;
  margin: 10px;

  @include respond(phone) {
    width: 90px;
    height: 100px;
    margin-left: 0px;
  }

  &__img {
    width: 200px;
    height: 270px;

    @include respond(phone) {
      width: 90px;
      height: 110px;
    }
  }
}

.router-link {
  text-decoration: none;
}
</style>
