<template>
  <div class="background">
    <div class="content">
      <MainComponent :key="$route.params.id"></MainComponent>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import MainComponent from "../Views/MainMovie.vue";

export default {
  components: { MainComponent },

  setup() {
    return {};
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.background {
  // background-color: $main-background-color;
  overflow: hidden;
  position: relative;

  &__image {
    filter: blur(8px);
    -webkit-filter: blur(8px);

    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}

.content {
  position: relative;
}
</style>
