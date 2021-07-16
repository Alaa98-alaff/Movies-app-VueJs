<template>
  <section class="new-movies-container">
    <p class="new-movies-container__title">New Movies</p>
    <div class="new-movies">
      <router-link
        v-for="movie in newMoviesObj"
        :key="movie.id"
        :to="/search/ + movie.title + '/' + movie.id"
      >
        <div class="new-movie" @click="testWatch($event, movie.id)">
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
</template>

<script>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
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
            console.log(newMovieRandomID.value);
          }
        });
    };
    newTopMovies();

    function testWatch(_, id) {
      // routeParamsID.value = route.params.id;
      console.log(id);
    }

    return {
      newTopMovies,
      newMoviesObj,
      movieImgUrl,
      testWatch,
      newMovieRandomID,
    };
  },
};
</script>

<style lang="scss">
.new-movies-container {
  display: flex;
  flex-direction: column;
  margin-right: $main-margin-right;
  margin-left: $main-margin-left;

  &__title {
    color: #fff;
    font-weight: 500;
    margin-bottom: 20px;
  }
}

.new-movies {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

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

    &:hover > .new-movie__img {
      opacity: 1;
      transition: all 0.5s;
      filter: brightness(100%);
    }

    &:hover > .new-movie__title {
      top: 20%;
      left: 50%;
      transform: translate(-50%, -20%);
      transition: all 0.45s;
    }

    &:hover > .new-movie__title::after {
      opacity: 1;
      transform: translate3d(0, 3.3em, 0);
    }

    &__title {
      font-size: 13px;
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -60%);
      transition: all 0.5s;
      width: 100%;

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
      }
    }

    &__img {
      width: 150px;
      height: 90px;
      border-radius: 8px;
      transition: all 0.5s;
      filter: brightness(60%);
    }

    &__highlight {
      width: 100px;
      height: 100px;
      background-color: blue;
    }
  }
}
</style>
