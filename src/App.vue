<template>
  <HeaderComponent></HeaderComponent>
</template>

<script>
import { useRoute } from "vue-router";
import HeaderComponent from "./components/Header.vue";
export default {
  components: { HeaderComponent },
  setup() {
    let route = useRoute();
    return { route };
  },
};
</script>

<style lang="scss"></style>
