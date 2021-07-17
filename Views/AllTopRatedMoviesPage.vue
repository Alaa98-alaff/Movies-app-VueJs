<template>
  <HeaderComponent></HeaderComponent>
  <main class="searhed-movies-main">
    <div class="searhed-movies-container">
      <div class="searched-movies-cards">
        <div v-for="movie in alltopRatedMovies" :key="movie.id">
          <router-link
            class="router-link"
            :to="'/search/' + movie.title + '/' + movie.id"
          >
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
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
import HeaderComponent from "../src/components/HeaderComponent.vue";

export default {
  components: { HeaderComponent },
  setup() {
    window.scrollTo(0, 0);

    let alltopRatedMovies = ref([]);
    let baseImgUrl = ref("https://image.tmdb.org/t/p/w500");

    async function getAllTopRatedMovies() {
      await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&page=1`
      )
        .then((response) => response.json())
        .then((data) => {
          alltopRatedMovies.value = data.results;
        });
    }

    getAllTopRatedMovies();

    return { alltopRatedMovies, baseImgUrl, getAllTopRatedMovies };
  },
};
</script>

<style lang="scss">
.router-link {
  text-decoration: none;
}
</style>
