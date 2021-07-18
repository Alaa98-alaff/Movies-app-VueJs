<template>
  <section class="sort-nav-section">
    <nav class="sort-nav">
      <p
        tabindex="0"
        class="sort-nav__type"
        :class="sortTitle === 'Populars' ? 'active' : ''"
        @click="findPopularMovies"
      >
        Popular
      </p>
      <p
        tabindex="0"
        class="sort-nav__type"
        :class="sortTitle === 'Horror' ? 'active' : ''"
        @click="findHorrorMovies"
      >
        Horror
      </p>
      <p
        tabindex="0"
        class="sort-nav__type"
        :class="sortTitle === 'Action' ? 'active' : ''"
        @click="findActionMovies"
      >
        Action
      </p>
      <p
        tabindex="0"
        class="sort-nav__type"
        :class="sortTitle === 'Comedy' ? 'active' : ''"
        @click="findComedyMovies"
      >
        Comedy
      </p>
      <p
        tabindex="0"
        class="sort-nav__type"
        :class="sortTitle === 'Drama' ? 'active' : ''"
        @click="findDramaMovies"
      >
        Drama
      </p>
      <p
        tabindex="0"
        class="sort-nav__type"
        :class="sortTitle === 'Romance' ? 'active' : ''"
        @click="findRomanceMovies"
      >
        Romance
      </p>
      <p
        tabindex="0"
        class="sort-nav__type"
        :class="sortTitle === 'Family' ? 'active' : ''"
        @click="findFamilyMovies"
      >
        Family
      </p>
    </nav>
  </section>

  <SlideMoviesComponent
    :sortedMovies="movieArr"
    :imgBaseUrl="baseImgUrl"
  ></SlideMoviesComponent>
</template>

<script>
import { ref } from "vue";
import SlideMoviesComponent from "./SlideMoviesComponent.vue";

export default {
  components: { SlideMoviesComponent },

  setup() {
    let sortTitle = ref("");
    let movieArr = ref();
    let baseImgUrl = ref("https://image.tmdb.org/t/p/w500");

    async function findPopularMovies() {
      sortTitle.value = "Populars";
      await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&sort_by=popularity.desc`
      )
        .then((response) => response.json())
        .then((data) => {
          movieArr.value = data.results;
        });
    }
    findPopularMovies();

    async function findSortedMoviesByID(id, type) {
      sortTitle.value = type;

      await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&with_genres=${id}`
      )
        .then((response) => response.json())
        .then((data) => {
          movieArr.value = data.results;
        });
    }

    function findActionMovies() {
      findSortedMoviesByID("28", "Action");
    }

    function findComedyMovies() {
      findSortedMoviesByID("35", "Comedy");
    }

    function findDramaMovies() {
      findSortedMoviesByID("18", "Drama");
    }

    function findHorrorMovies() {
      findSortedMoviesByID("27", "Horror");
    }

    function findRomanceMovies() {
      findSortedMoviesByID("10749", "Romance");
    }

    function findFamilyMovies() {
      findSortedMoviesByID("10751", "Family");
    }

    return {
      findPopularMovies,
      findSortedMoviesByID,
      movieArr,
      baseImgUrl,
      sortTitle,
      findActionMovies,
      findComedyMovies,
      findDramaMovies,
      findHorrorMovies,
      findRomanceMovies,
      findFamilyMovies,
    };
  },
};
</script>

<style lang="scss">
.sort-nav-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sort-nav {
  width: 1250px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  font-size: 19px;

  @include respond(phone) {
    margin-top: 18px;
    margin-left: 14px;
    font-size: 11px;
    width: 650px;
    height: 50px;
  }

  &__type {
    color: #fff;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      color: rgb(143, 48, 48);
      transition: all 0.2s;
    }
  }
}

.active {
  color: rgb(143, 48, 48);
  font-weight: bolder;
  font-size: 25px;
  transition: all 0.03s;

  @include respond(phone) {
    font-size: 14px;
  }
}
</style>
