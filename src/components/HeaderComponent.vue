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
          placeholder="Movie Name .."
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
import routing from "../router/index";

export default {
  components: {},
  setup() {
    let search = ref("");

    function searchMovie() {
      if (search.value !== "") {
        routing.push(`/search/${search.value.split(" ").join("+")}`);
      }
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

  @include respond(tab-port) {
    height: 80px;
    padding: 5px 15px;
  }

  @include respond(phone) {
    height: 50px;
    padding: 0px 12px;
    padding-top: 7px;
    padding-bottom: 0px;
  }

  &__logo {
    display: flex;
    margin: 0;

    @include respond(tab-port) {
      font-size: 28px;
    }

    @include respond(phone) {
      font-size: 22.5px;
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
  height: 32px;
  border-radius: 50px;
  padding: 8px 14px;
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
    font-size: 18px;
    margin-top: 2px;

    @include respond(tab-port) {
      font-size: 18px;
    }

    @include respond(phone) {
      font-size: 13px;
    }
  }

  @include respond(tab-port) {
    height: 20px;
    padding: 13px 12px;
    padding-left: 15px;
    padding-top: 15px;
  }

  @include respond(phone) {
    height: 14px;
    padding: 10px 9px;
    padding-left: 7px;
    padding-top: 8px;
  }
}

.search-container:hover > .search-input {
  width: 250px;

  @include respond(tab-port) {
    width: 80px;
    font-size: 8.5px;
  }

  @include respond(phone) {
    width: 55px;
    font-size: 7.5px;
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
