<template>
  <div>
    Инфо о фильме
    <p>Movie {{ movieStore.movie.nameRu }}</p>
  </div>
</template>
<script setup lang="ts">
import { useMovieStore } from '@/stores/movieStore';
import { useRoute } from 'vue-router';

const movieStore = useMovieStore();
const route = useRoute();
movieStore.getAllInfo(+route.params.movieId)
</script>
