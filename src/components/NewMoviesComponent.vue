<template>
  <main class="new-movies-main">
    <section class="new-movies-container">
      <div class="new-movies-title">
        <p class="new-movies-container__title">New Movies</p>
        <i class="fas fa-fire fa-lg"></i>
      </div>
      <div class="new-movies">
        <router-link
          v-for="movie in newMoviesObj"
          :key="movie.id"
          :to="/search/ + movie.title + '/' + movie.id"
        >
          <div class="new-movie">
            <img
              class="new-movie__img"
              :src="movieImgUrl + movie.backdrop_path"
              :alt="movie.title"
            />
            <p class="new-movie__title">
              {{ movie.title.split(" ").slice(-3).join(" ") }}
            </p>
          </div>
        </router-link>
      </div>
    </section>
  </main>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

export default {
  emits: ["newMovieRandomId"],
  setup(props, { emit }) {
    const route = useRoute();
    let routeParamsID = ref(route.params.id);

    let newMovieRandomID = ref();
    let newMoviesObj = ref([]);
    let randomOne = Math.floor(Math.random() * 15) + 1;
    let movieImgUrl = ref("https://image.tmdb.org/t/p/w200");

    // Api for most popular and new movies
    const newTopMovies = async () => {
      await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&sort_by=popularity.desc&page=1&year=2021&with_watch_monetization_types=flatrate`
      )
        .then((response) => response.json())
        .then((data) => {
          for (let i = randomOne; i < randomOne + 5; i++) {
            newMoviesObj.value.push(data.results[i]);
            newMovieRandomID.value = data.results[i].id;
          }
          emit(
            "newMovieRandomId",
            data.results[data.results.length - randomOne].id
          );
        });
    };
    newTopMovies();

    return {
      newTopMovies,
      newMoviesObj,
      movieImgUrl,
      newMovieRandomID,
    };
  },
};
</script>

<style lang="scss">
.new-movies-main {
  display: flex;
  align-items: center;
  justify-content: center;
}

.new-movies-container {
  display: flex;
  flex-direction: column;
  margin-top: -20px;
  padding-bottom: 50px;
  //   width: 800px;
  align-items: flex-start;

  &__title {
    color: #fff;
    font-weight: 500;
    margin-right: 10px;
    margin-left: 6px;

    @include respond(tab-port) {
      font-size: 90%;
      margin: 8px;
    }

    @include respond(phone) {
      font-size: 80%;
      margin: 4px;
    }
  }

  .new-movies-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .fa-fire {
      color: #fff;

      @include respond(tab-port) {
        font-size: 20px;
      }

      @include respond(phone) {
        font-size: 80%;
      }
    }
  }
}

.new-movies {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: -5px;

  .new-movie {
    width: 150px;
    height: 90px;
    border-radius: 10px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: relative;
    text-align: center;
    padding: 5px;

    @include respond(tab-port) {
      width: 115px;
      height: 85px;
    }

    @include respond(phone) {
      width: 62.5px;
      height: 50px;
    }

    &:hover > .new-movie__img {
      opacity: 1;
      transition: all 0.5s;
      filter: brightness(100%);
    }

    &:hover > .new-movie__title {
      top: 23%;
      left: 50%;
      transform: translate(-50%, -23%);
      transition: all 0.45s;

      @include respond(tab-port) {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      @include respond(phone) {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    &:hover > .new-movie__title::after {
      opacity: 1;
      transform: translate3d(0, 3.4em, 0);

      @include respond(tab-port) {
        opacity: 0;
      }

      @include respond(phone) {
        opacity: 0;
      }
    }

    &__title {
      font-size: 13px;
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -60%);
      transition: all 0.5s;
      width: 100%;

      @include respond(tab-port) {
        font-size: 13px;
        width: 100px;
      }

      @include respond(phone) {
        font-size: 7px;
        top: 70%;
        width: 65px;
      }

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.5em;
        background-color: $red-color;
        opacity: 0;
        border-radius: 20px;
        // transition: opacity 300ms, transsform 100ms;

        @include respond(phone) {
          font-size: 50%;
        }
      }
    }

    &__img {
      width: 155px;
      height: 90px;
      border-radius: 8px;
      transition: all 0.5s;
      filter: brightness(60%);

      @include respond(tab-port) {
        width: 115px;
        height: 75px;
        filter: brightness(80%);
      }

      @include respond(phone) {
        width: 70px;
        height: 45px;
        filter: brightness(80%);
      }
    }

    &__highlight {
      width: 100px;
      height: 100px;
      background-color: blue;
    }
  }
}
</style>
