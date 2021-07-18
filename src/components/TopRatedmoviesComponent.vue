<template>
  <main class="topRated-container">
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
.topRated-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.topRated-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
  padding: 10px;

  @include respond(tab-port) {
    width: 550px;
    font-size: 70%;
    padding-bottom: 0;
  }

  @include respond(phone) {
    width: 335px;
    font-size: 50%;
    padding-bottom: 0;
  }

  .view-all {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $grey-color;
    cursor: pointer;
    font-size: 20px;

    @include respond(tab-port) {
      font-size: 18px;
    }

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

    @include respond(tab-port) {
      margin-right: 8px;
    }

    @include respond(phone) {
      margin-right: 7px;
    }
  }

  .fa-arrow-up {
    color: #fff;
  }
}

.topRated-movies-container {
  display: flex;
  width: 1200px;
  justify-content: center;
  align-items: flex-start;

  @include respond(tab-port) {
    width: 700px;
  }

  @include respond(phone) {
    width: 370px;
  }
}

.firstTop-movie {
  padding: 10px;

  &__img {
    width: 320px;
    height: 560px;

    @include respond(tab-port) {
      width: 185px;
      height: 380px;
    }

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

  @include respond(tab-port) {
    width: 250px;
  }

  @include respond(phone) {
    width: 200px;
  }
}

.topRated-movie-card {
  width: 200px;
  height: 270px;
  margin: 10px;

  @include respond(tab-port) {
    width: 110px;
    height: 120px;
    margin-left: 0px;
    margin-bottom: 0;
    margin-left: 0px;
  }

  @include respond(phone) {
    width: 90px;
    height: 100px;
    margin-left: 0px;
    margin-bottom: 10px;
  }

  &__img {
    width: 200px;
    height: 270px;

    @include respond(tab-port) {
      width: 110px;
      height: 120px;
    }

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
