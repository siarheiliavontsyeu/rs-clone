<template>
  <div>
    Инфо о фильме
    <p>Movie {{ movieStore.movie.nameRu }}</p>
  </div>
</template>
<script setup lang="ts">
import { useMovieStore } from "@/stores/movieStore";
import { watch } from "vue";
import { useRoute } from "vue-router";

const movieStore = useMovieStore();
const route = useRoute();
watch(() => route.params.movieId, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    movieStore.getAllInfo(+newValue);
  }
},
  { deep: true })

movieStore.getAllInfo(+route.params.movieId);
</script>
