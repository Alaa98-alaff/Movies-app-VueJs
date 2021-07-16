<template>
  <div class="background-img">
    <img
      class="background-img__img"
      :src="baseImgUrl + movieDetails.backdrop_path"
      alt=""
    />
    <HeaderComponent></HeaderComponent>
    <main class="main-movie">
      <div class="trial">
        <img
          class="trial__image"
          :src="baseImgUrl + movieDetails.poster_path"
          :alt="movieDetails.title"
        />
      </div>

      <div class="titles">
        <div class="titles-container">
          <h1 class="titles__main-title">
            {{ movieDetails.title }}
          </h1>
          <p class="titles__year">
            {{ movieDetails.release_date?.split("-")[0] }}
          </p>
          <p class="titles__runtime">
            {{ movieDetails.runtime }} min |
            <span class="titles__category">
              {{ movieDetails.genres?.map((gener) => gener.name).join(", ") }}
            </span>
          </p>
          <div class="rating-container">
            <i class="rating-container__star fas fa-star fa-2x"></i>
            <p>
              <strong class="rating-container__rate">{{
                movieDetails.vote_average
              }}</strong
              >/ 10
            </p>

            <i class="rating-container__imdb fab fa-imdb fa-3x"></i>
          </div>
          <p class="titles__summary">
            {{ movieDetails.overview?.split(" ").slice(-35).join(" ") }}
          </p>
        </div>
        <div class="buttons">
          <a :href="youtubeBaseUrl + trailVideoLink">
            <button class="buttons__btn trial">Watch trial</button>
          </a>
          <button class="buttons__btn move">Watch Movie</button>
        </div>
      </div>
    </main>
    <NewMoviesComponent
      @newMovieRandomId="GetNewMovieRandomId"
    ></NewMoviesComponent>
  </div>
  <SortMoviesComponent></SortMoviesComponent>
</template>

<script>
import { ref, watch } from "vue";

import HeaderComponent from "../src/components/HeaderComponent.vue";
import NewMoviesComponent from "../src/components/NewMoviesComponent.vue";
import SortMoviesComponent from "../src/components/SortedMoviesComponent.vue";

export default {
  props: ["id"],
  components: { HeaderComponent, NewMoviesComponent, SortMoviesComponent },

  setup(props) {
    let randomId = ref();
    let movieDetails = ref({});
    let baseImgUrl = ref("https://image.tmdb.org/t/p/w500");
    let trailVideoLink = ref("");
    let youtubeBaseUrl = ref("https://www.youtube.com/watch?v=");

    function GetNewMovieRandomId(id) {
      randomId.value = id;
    }
    GetNewMovieRandomId();

    // watch and update the movie when movie id change
    async function getMovieInfoWithID(id) {
      await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${
          import.meta.env.VITE_API_KEY
        }&append_to_response=images,videos`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          trailVideoLink.value = data.videos.results[0].key;
          movieDetails.value = data;
        });
    }

    watch(
      () => randomId.value,
      (newValue) => getMovieInfoWithID(newValue)
    );

    getMovieInfoWithID(randomId.value);

    return {
      movieDetails,
      getMovieInfoWithID,
      baseImgUrl,
      trailVideoLink,
      youtubeBaseUrl,
      GetNewMovieRandomId,
      randomId,
    };
  },
};
</script>

<style lang="scss">
.background-img {
  position: relative;

  &__img {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 100%;
    width: 100%;
    transform: translate(-50%, -50%);
    opacity: 0.3;
    z-index: -1;
    filter: blur(2.7px);
  }
}

.main-movie {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: $main-margin-right;
  margin-left: $main-margin-left;
  margin-top: $main-margin-top;
}

.trial {
  &__image {
    height: 400px;
  }
}

.titles {
  color: #fff;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 40px;

  p {
    margin: 13px;
  }

  &__category {
    font-weight: 500;
  }

  &__main-title {
    margin: 0;
  }

  &__summary {
    word-wrap: break-word;
  }
}

.rating-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 170px;

  &__rate {
    font-size: 25px;
  }

  &__star {
    color: rgb(221, 191, 22);
  }

  &__imdb {
    color: rgb(201, 190, 93);
  }
}
.buttons {
  display: flex;
  justify-content: space-between;
  width: 440px;

  &__btn {
    width: 210px;
    height: 40px;
    border-radius: 20px;
    border-style: none;
    font-size: 17px;
  }

  .trial {
    background-color: $grey-color;
    color: #fff;

    &:hover {
      background-color: rgb(121, 100, 100);
    }

    &:active {
      background-color: rgb(71, 66, 66);
    }
  }

  .move {
    background-color: $red-color;
    color: #fff;

    &:hover {
      background-color: rgb(192, 54, 54);
    }

    &:active {
      background-color: rgb(226, 7, 7);
    }
  }
}

.buttons__btn:hover {
  cursor: pointer;
}
</style>
