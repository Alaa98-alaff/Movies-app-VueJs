<template>
  <link
    href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
    rel="stylesheet"
  />
  <header class="header">
    <router-link to="/">
      <h1 class="header__logo">
        <span class="movies">Movies.</span><span class="vue">Vue</span>
      </h1>
    </router-link>

    <form @submit.prevent="searchMovie">
      <div class="search-container">
        <input
          v-model="search"
          type="text"
          name="search"
          placeholder="Search for Movies .."
          class="search-input"
        />

        <a v-on:click="searchMovie" href="#" class="search-btn">
          <i class="fas fa-search"></i>
        </a>
      </div>
    </form>
  </header>

  <!-- <MainMovieComponent :movieSearched="newestMovieinfo"></MainMovieComponent> -->
</template>

<script>
import { ref, onMounted } from "vue";
import MainMovieComponent from "./MainMovie.vue";
import { useRoute } from "vue-router";
import routing from "../../../router/index";

export default {
  setup() {
    let search = ref("");

    function searchMovie() {
      routing.push(`/search/${search.value.split(" ").join("+")}`);
    }

    return { search, searchMovie };
  },
};
</script>

<style lang="scss">
.header {
  background-color: $header-background-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 0 40px 0 40px;

  &__logo {
    display: flex;
    margin: 0;

    &:hover {
      cursor: pointer;
    }

    .movies {
      color: $logo-red-color;
      text-decoration: underline;
    }

    .vue {
      color: $logo-blue-color;
      text-decoration: underline;
    }
  }
}

.search-container {
  background: $logo-red-color;
  height: 30px;
  border-radius: 40px;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.8s;
  text-shadow: 2px 2px 3px rgba(206, 66, 66, 0.5);
  box-shadow: 4px 4px 6px 0 rgba(175, 32, 32, 0.3),
    -2px -2px 4px 0 rgba(60, 102, 155, 0.2),
    -2px -2px 4px 0 rgba(148, 69, 69, 0.2), 4px 4px 6px 0 rgba(136, 34, 34, 0.2);
}

.search-container:hover > .search-input {
  width: 250px;
}

.search-container .search-input {
  background: transparent;
  border: none;
  outline: none;
  width: 0px;
  font-weight: 500;
  font-size: 16px;
  transition: 0.5s;
}

.search-container .search-btn .fas {
  color: rgb(173, 172, 172);
}

.search-container:hover {
  animation: hoverShake 0.15s linear 3;
}
</style>
