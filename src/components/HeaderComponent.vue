<template>
  <link
    href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
    rel="stylesheet"
  />
  <header class="header">
    <router-link to="/" class="router-Link">
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
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import routing from "../../router/index";

export default {
  components: {},
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
  // background-color: $header-background-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 16px;
  height: 90px;

  &__logo {
    display: flex;
    margin: 0;

    @include respond(phone) {
      font-size: 25px;
    }

    &:hover {
      cursor: pointer;
    }

    .movies {
      color: $logo-red-color;
    }

    .vue {
      color: $logo-blue-color;
    }
  }
}

.search-container {
  background-color: $logo-red-color;
  height: 38px;
  border-radius: 50px;
  padding: 13px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.8s;
  text-shadow: 2px 2px 3px rgba(206, 66, 66, 0.5);
  box-shadow: 4px 4px 6px 0 rgba(175, 32, 32, 0.3),
    -2px -2px 4px 0 rgba(0, 0, 0, 0.2), -2px -2px 4px 0 rgba(148, 69, 69, 0.2),
    4px 4px 6px 0 rgba(136, 34, 34, 0.2);

  .fa-search {
    font-size: 22px;
    margin-top: 2px;

    @include respond(phone) {
      font-size: 17px;
    }
  }

  @include respond(phone) {
    height: 32px;
    padding: 8px 15px;
  }
}

.search-container:hover > .search-input {
  width: 250px;

  @include respond(phone) {
    width: 55px;
    font-size: 10px;
  }
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

::placeholder {
  color: rgb(32, 24, 24);
}

.search-container .search-btn .fas {
  color: rgb(37, 32, 32);
}

.search-container:hover {
  animation: hoverShake 0.15s linear 3;
}

.router-Link {
  text-decoration: none;
}
</style>
