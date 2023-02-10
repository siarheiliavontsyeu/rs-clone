<template>
  <MyLoaderVue v-if="searchStore.isLoading" />
  <div v-else>
    Инфо о фильме
    <p>Movie {{ movieStore.movie.nameRu }}</p>
  </div>
</template>
<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vue-router";
import { useMovieStore } from "@/stores/movieStore";
import { useSearchStore } from "@/stores/searchStore";
import MyLoaderVue from "@/components/MyLoader.vue";

const movieStore = useMovieStore();
const searchStore = useSearchStore();
const route = useRoute();
watch(() => route.params.movieId, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    movieStore.getAllInfo(+newValue);
  }
},
  { deep: true })

movieStore.getAllInfo(+route.params.movieId);
</script>

<style scoped>
.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
