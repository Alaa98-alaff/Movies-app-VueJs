<template>
  <main class="main-movie">
    <div class="trial">
      <img class="trial__image" :src="result.Poster" :alt="result.Title" />
    </div>

    <div class="titles">
      <div class="titles-container">
        <h1 class="titles__main-title">{{ result.Title }}</h1>
        <p class="titles__year">{{ result.Year }}</p>
        <p class="titles__runtime">
          {{ result.Runtime }} |
          <span class="titles__category">{{ result.Genre }}</span>
        </p>
        <div class="rating-container">
          <i class="rating-container__star fas fa-star fa-2x"></i>
          <p>
            <strong class="rating-container__rate">{{
              result.imdbRating
            }}</strong
            >/ 10
          </p>

          <i class="rating-container__imdb fab fa-imdb fa-3x"></i>
        </div>
        <p class="titles__summary">
          {{ result.Plot }}
        </p>
      </div>
      <div class="buttons">
        <button class="buttons__btn trial">Watch trial</button>
        <button class="buttons__btn move">Watch Movie</button>
      </div>
    </div>
  </main>
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "axios";
export default {
  setup() {
    // Api result for the main movie
    const result = ref({});

    onMounted(async () => {
      try {
        const res = await axios.get(
          // "https://www.omdbapi.com/?apikey=9a933189&t=Miracle+in+Cell+No.+7"
          "https://www.omdbapi.com/?apikey=9a933189&t=f9"
        );
        result.value = res.data;
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    });
    return { result };
  },
};
</script>

<style lang="scss">
.main-movie {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: $margin-right;
  margin-left: $margin-left;
  margin-top: $margin-top;
}

.trial {
  &__image {
    height: 400px;
  }
}

.titles {
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
