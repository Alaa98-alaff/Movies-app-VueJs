<template>
  <section class="new-movies">
    <p class="new-movies__title">New Movies</p>
    <div class="movies">
      <div class="movies__movie"></div>
      <div class="movies__movie"></div>
      <div class="movies__movie"></div>
      <div class="movies__movie"></div>
      <div class="movies__movie"></div>
    </div>
  </section>
</template>

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
