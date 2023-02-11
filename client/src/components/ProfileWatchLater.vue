<template>
  <v-container fluid>
    <v-row align="center">
      <v-col>
        <h1>Посмотреть позже</h1>
      </v-col>
    </v-row>
    <v-row> </v-row>
  </v-container>
  <v-container fluid>
    <v-row>
      <v-col v-for="(movie, index) in movies" :key="index" cols="12" md="4">
        <MovieCard :movie="movie"></MovieCard>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import type { MovieModel } from "../types/movies.types";
import MovieCard from "@/components/MovieCard.vue";

const props = defineProps<{
  movies: MovieModel[];
}>();
</script>
<style scoped></style>
