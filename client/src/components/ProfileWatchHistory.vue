<template>
  <v-container fluid>
    <v-row align="center">
      <v-col>
        <h2>История просмотров</h2>
      </v-col>
    </v-row>
    <v-row> </v-row>
  </v-container>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="(hist, index) in history"
        :key="index"
        cols="12"
        sm="6"
        md="3"
        lg="2"
      >
        <MovieCard :movie="hist.movie"></MovieCard>
        {{ hist.movie }}
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
<style scoped></style>
