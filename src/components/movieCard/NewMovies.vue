<template>
  <section class="new-movies">
    <p class="new-movies__title">New Movies</p>
    <div class="movies">
      <router-link to="/movie">
        <div class="movies__movie" v-for="movie in newMoviesObj">
          {{ movie.title }}
        </div>
      </router-link>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let newMoviesObj = ref([]);
    let randomOne = Math.floor(Math.random() * 15) + 1;

    const newTopMovies = async () => {
      await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&sort_by=popularity.desc&page=1&year=2021&with_watch_monetization_types=flatrate`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.results);

          for (let i = randomOne; i < randomOne + 5; i++) {
            newMoviesObj.value.push(data.results[i]);
          }
        });
      console.log(newMoviesObj.value);
    };

    newTopMovies();

    return { newTopMovies, newMoviesObj };
  },
};
</script>

<style lang="scss">
.new-movies {
  display: flex;
  flex-direction: column;
  margin-right: $margin-right;
  margin-left: $margin-left;
  margin-top: 30px;
  &__title {
    color: #fff;
    font-weight: 500;
    margin-bottom: 10px;
  }
}

.movies {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__movie {
    width: 130px;
    height: 60px;
    background-color: rgb(73, 60, 60);
    border-radius: 10px;
  }
}
</style>
