<template>
  <v-container v-if="movieStore.images.length">
    <div class="images">
      <div v-for="(image, index) in movieStore.images" :key="index">
        <img :src="image.previewUrl" alt="movie image" />
      </div>
    </div>
  </v-container>
  <v-container v-else>
    <h6 class="text-h6">
      К сожалению, у нас нет изображений связанных с этим фильмом
    </h6>
  </v-container>
</template>
<script setup lang="ts">
import { useMovieStore } from "@/stores/movieStore";

const movieStore = useMovieStore();
</script>
<style scoped>
.images {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-between;
}
</style>
