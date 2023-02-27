<template>
  <v-container>
    <v-row align="center">
      <v-col>
        <h2 class="text-center">История просмотров</h2>
      </v-col>
    </v-row>
    <v-row> </v-row>
  </v-container>
  <v-container>
    <v-row class="movies">
      <v-col
        v-for="(hist, index) in history"
        :key="index"
        cols="12"
        sm="6"
        md="3"
        lg="2"
      >
        <MovieCard :movie="hist.movie"></MovieCard>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import MovieCard from "@/components/MovieCard.vue";
import type { WatchHistoryModel } from "@/types/user.types";

const props = defineProps<{
  history: WatchHistoryModel[];
}>();
</script>
<style scoped>
.movies {
  max-height: 500px;
  overflow: scroll;
}
</style>
