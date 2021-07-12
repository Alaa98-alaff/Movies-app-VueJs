<template>
  <section class="new-movies-container">
    <p class="new-movies-container__title">New Movies</p>
    <router-link to="/movie">
      <div class="new-movies">
        <div class="new-movie" v-for="movie in newMoviesObj">
          <img
            class="new-movie__img"
            :src="movieImgUrl + movie.backdrop_path"
            :alt="movie.title"
          />
          <p class="new-movie__title">
            {{ movie.title.split(" ").slice(-4).join(" ") }}
          </p>
        </div>
      </div>
    </router-link>
  </section>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let newMoviesObj = ref([]);
    let randomOne = Math.floor(Math.random() * 15) + 1;
    let movieImgUrl = ref("https://image.tmdb.org/t/p/w200");

    const newTopMovies = async () => {
      await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&sort_by=popularity.desc&page=1&year=2021&with_watch_monetization_types=flatrate`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.results);

          for (let i = randomOne; i < randomOne + 5; i++) {
            newMoviesObj.value.push(data.results[i]);
            console.log(newMoviesObj.value);
          }
        });
    };

    newTopMovies();

    return { newTopMovies, newMoviesObj, movieImgUrl };
  },
};
</script>

<style lang="scss">
.new-movies-container {
  display: flex;
  flex-direction: column;
  margin-right: $margin-right;
  margin-left: $margin-left;
  margin-top: 40px;

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
    width: 160px;
    height: 80px;
    border-radius: 10px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: relative;
    text-align: center;

    &:hover > .new-movie__img {
      opacity: 1;
      transition: opacity 0.5s;
    }

    &:hover > .new-movie__title {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: transform 0.45s;
      font-size: 15px;
      font-weight: 600;
    }

    &:hover > .new-movie__title::after {
      opacity: 1;
      transform: translate3d(0, 0.2em, 0);
    }

    &__title {
      font-size: 13px;
      // font-weight: 600;
      position: absolute;
      padding-bottom: 5px;
      left: 50%;
      transform: translate(-50%);
      transition: transform 0.5s;

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
        transition: opacity 300ms, transform 300ms;
      }
    }

    &__img {
      width: 150px;
      height: 90px;
      border-radius: 8px;
      opacity: 0.4;
      transition: opacity 0.5s;
    }

    &__highlight {
      width: 100px;
      height: 100px;
      background-color: blue;
    }
  }
}
</style>
