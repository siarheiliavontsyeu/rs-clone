<template>
  <v-container v-if="movieStore.awards.length">
    <div>{{ movieStore.awards }}</div>
  </v-container>
  <v-container v-else>
    <h6 class="text-h6">Жулик своровал, но возможно Даша скоро найдет</h6>
  </v-container>
</template>
<script setup lang="ts">
import { useMovieStore } from '@/stores/movieStore';

const movieStore = useMovieStore()
</script>
<style scoped>

</style>
