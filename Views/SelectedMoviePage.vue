<template>
  <div class="background-img">
    <img
      class="background-img__img"
      :src="baseImgUrl + selectedMovieDetails.backdrop_path"
      alt=""
    />
    <HeaderComponent></HeaderComponent>
    <div class="main-container">
      <main class="main-movie selected">
        <div class="trial">
          <img
            class="trial__image"
            :src="baseImgUrl + selectedMovieDetails.poster_path"
            :alt="selectedMovieDetails.title"
          />
        </div>

        <div class="titles">
          <div class="titles-container">
            <h1 class="titles__main-title">
              {{ selectedMovieDetails.title }}
            </h1>
            <p class="titles__year">
              {{ selectedMovieDetails.release_date?.split("-")[0] }}
            </p>
            <p class="titles__runtime">
              {{ selectedMovieDetails.runtime }} min |
              <span class="titles__category">
                {{
                  selectedMovieDetails.genres
                    ?.map((gener) => gener.name)
                    .join(", ")
                }}
              </span>
            </p>
            <div class="rating-container">
              <i class="rating-container__star fas fa-star fa-2x"></i>
              <p>
                <strong class="rating-container__rate">{{
                  selectedMovieDetails.vote_average
                }}</strong
                >/ 10
              </p>

              <i class="rating-container__imdb fab fa-imdb fa-3x"></i>
            </div>
            <p class="titles__summary">
              {{
                selectedMovieDetails.overview?.split(" ").slice(-20).join(" ")
              }}
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
    <SimilarMoviesComponent :movieId="movieID"></SimilarMoviesComponent>
  </div>

  <section class="cast-section">
    <div class="cast">
      <h1 class="cast__title">CAST</h1>
      <div class="cast__cast-cards">
        <div class="cast-card" v-for="cast in castArr" :key="cast.id">
          <img
            :src="baseImgUrl + cast.profile_path"
            alt=""
            class="cast-card__img"
          />
          <p class="cast-card__name">{{ cast.name }}</p>
          <p class="cast-card__character">as - {{ cast.character }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, watch } from "vue";
import HeaderComponent from "../src/components/HeaderComponent.vue";
import SimilarMoviesComponent from "../src/components/SimilarMoviesComponent.vue";

export default {
  props: ["name", "id"],
  components: { HeaderComponent, SimilarMoviesComponent },

  setup(props) {
    window.scrollTo(0, 0);

    watch(
      () => props.id,
      () => window.scrollTo(0, 0)
    );

    let movieID = ref(props.id);
    let baseImgUrl = ref("https://image.tmdb.org/t/p/w500");
    let selectedMovieDetails = ref({});
    let castArr = ref([]);
    let trailVideoLink = ref("");
    let youtubeBaseUrl = ref("https://www.youtube.com/watch?v=");

    async function getSelectedMovieDetails(id) {
      await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${
          import.meta.env.VITE_API_KEY
        }&append_to_response=credits,videos`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          selectedMovieDetails.value = data;
          castArr.value = data.credits.cast.slice(0, 8);
          trailVideoLink.value = data.videos.results[0].key;
        });
    }
    getSelectedMovieDetails(movieID.value);

    watch(
      () => props.id,
      (newValue) => getSelectedMovieDetails(newValue)
    );

    return {
      getSelectedMovieDetails,
      selectedMovieDetails,
      baseImgUrl,
      castArr,
      trailVideoLink,
      trailVideoLink,
      youtubeBaseUrl,
      movieID,
    };
  },
};
</script>

<style lang="scss">
body {
  background-color: #252222;
  margin: 0;
  padding: 0;
}

.main-movie {
  padding-bottom: 40px;
}

.selected {
  padding-bottom: 40px;
}

.titles__category {
  font-size: 14px;
}

.cast-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: $crew-margin-top;

  .cast {
    &__title {
      font-weight: 500;
      color: #fff;
      margin-left: 30px;
      margin-bottom: 24px;
      font-size: 25px;
      margin-top: -10px;
    }

    &__cast-cards {
      width: 900px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: -32px;

      @include respond(tab-port) {
        justify-content: center;
        width: 600px;
      }

      @include respond(phone) {
        justify-content: center;
        width: 340px;
      }

      .cast-card {
        margin-top: 25px;
        width: 200px;

        @include respond(phone) {
          width: 100px;
          height: 125px;
          width: 80px;
          margin: 10px 10px 60px 10px;
        }

        &__img {
          height: 300px;
          width: 200px;

          @include respond(tab-port) {
            height: 170px;
            width: 140px;
          }

          @include respond(phone) {
            height: 125px;
            width: 80px;
          }
        }

        &__name {
          color: #fff;
          word-wrap: break-word;
          margin: 0;

          @include respond(phone) {
            font-size: 8px;
          }
        }

        &__character {
          color: rgb(158, 145, 145);
          font-size: 12px;
          margin: 0;

          @include respond(phone) {
            font-size: 7px;
          }
        }
      }
    }
  }
}
</style>
