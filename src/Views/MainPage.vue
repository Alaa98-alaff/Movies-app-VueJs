<template>
  <div class="background-img">
    <img
      class="background-img__img"
      :src="baseImgUrl + movieDetails.backdrop_path"
      alt=""
    />
    <HeaderComponent></HeaderComponent>
    <div class="main-container">
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
              <p v-if="movieDetails?.vote_average">
                <strong class="rating-container__rate">{{
                  +movieDetails?.vote_average?.toFixed(1)
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
          </div>
        </div>
      </main>
    </div>
    <NewMoviesComponent
      @newMovieRandomId="GetNewMovieRandomId"
    ></NewMoviesComponent>
  </div>
  <SortNavComponent></SortNavComponent>
  <TopRatedmoviesComponent></TopRatedmoviesComponent>
</template>

<script>
import { ref, watch } from "vue";

import HeaderComponent from "../components/HeaderComponent.vue";
import NewMoviesComponent from "../components/NewMoviesComponent.vue";
import SortNavComponent from "../components/SortNavComponent.vue";
import TopRatedmoviesComponent from "../components/TopRatedmoviesComponent.vue";

export default {
  props: ["id"],
  components: {
    HeaderComponent,
    NewMoviesComponent,
    SortNavComponent,
    TopRatedmoviesComponent,
  },

  setup(props) {
    window.scrollTo(0, 0);

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
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${
            import.meta.env.VITE_API_KEY
          }&append_to_response=images,videos`
        );
        const data = await response.json();

        if (data?.videos?.results?.[0]) {
          trailVideoLink.value = data.videos.results[0].key;
          movieDetails.value = data;
        } else {
          // Move this line inside the else block
          searchForAnotherMovie();
        }
      } catch (error) {
        console.error("Error fetching movie information:", error);
      }
    }

    function generateRandomId() {
      return Math.floor(Math.random() * 1000) + 1;
    }

    async function searchForAnotherMovie() {
      const newRandomId = generateRandomId();
      await getMovieInfoWithID(newRandomId);
    }

    watch(
      () => randomId.value,
      (newValue) => getMovieInfoWithID(newValue)
    );

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

.main-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: $main-margin-right;
  margin-left: $main-margin-left;

  @include respond(tab-port) {
    margin-right: 0;
    margin-left: 0;
  }

  @include respond(phone) {
    margin-right: 0;
    margin-left: 0;
  }
}

.main-movie {
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  @include respond(tab-port) {
    margin-top: 28px;
  }

  @include respond(phone) {
    margin-top: 25px;
  }
}

.trial {
  &__image {
    height: 400px;

    @include respond(tab-port) {
      height: 280px;
      width: 150px;
      margin-left: 30px;
    }

    @include respond(phone) {
      height: 250px;
      width: 150px;
      margin-left: 10px;
    }
  }
}

.titles {
  color: #fff;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 40px;

  @include respond(tab-port) {
    font-size: 70%;
    height: 280px;
    width: 250px;
    margin-left: 20px;
  }

  @include respond(phone) {
    font-size: 53%;
    height: 250px;
    width: 170px;
    margin-left: 15px;
  }

  &__main-title {
    @include respond(tab-port) {
      width: 190px;
      word-wrap: break-word;
      font-size: 15.5px;
    }

    @include respond(phone) {
      width: 170px;
      word-wrap: break-word;
      font-size: 12.5px;
    }
  }

  &__runtime {
    @include respond(tab-port) {
      width: 270px;
      word-wrap: break-word;
      margin-bottom: 0;
    }

    @include respond(phone) {
      width: 175px;
      word-wrap: break-word;
      margin-bottom: 0;
    }
  }

  &__year {
    @include respond(tab-port) {
      width: 185px;
      margin-right: 0;
      margin-top: 1px;
    }

    @include respond(phone) {
      width: 170px;
      margin-right: 0;
      margin-top: 1px;
    }
  }

  &__category {
    font-weight: 500;

    @include respond(tab-port) {
      font-size: 90%;
      height: 300px;
      margin: 0;
    }

    @include respond(phone) {
      font-size: 90%;
      height: 300px;
      margin: 0;
    }
  }

  &__main-title {
    margin: 0;
  }

  &__summary {
    word-wrap: break-word;
    width: 475px;
    height: 100px;

    @include respond(tab-port) {
      width: 270px;
      height: 50px;
      word-wrap: break-word;
      margin: 0px;
    }

    @include respond(phone) {
      width: 155px;
      height: 50px;
      word-wrap: break-word;
      margin: 0px;
    }
  }
}

.rating-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 170px;

  @include respond(tab-port) {
    width: 140px;
  }

  @include respond(phone) {
    width: 90px;
  }

  &__rate {
    font-size: 25px;

    @include respond(tab-port) {
      font-size: 18px;
    }

    @include respond(phone) {
      font-size: 10px;
    }
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

  @include respond(tab-port) {
    width: 190px;
  }

  @include respond(phone) {
    width: 170px;
  }

  &__btn {
    width: 270px;
    height: 40px;
    border-radius: 20px;
    border-style: none;
    font-size: 17px;

    @include respond(tab-port) {
      width: 175px;
      height: 35px;
      font-size: 14px;
    }

    @include respond(phone) {
      width: 148px;
      height: 30px;
      font-size: 12px;
    }
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
