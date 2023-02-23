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
        v-for="(movie, index) in movies"
        :key="index"
        cols="12"
        sm="6"
        md="3"
        lg="2"
      >
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
console.log(props.movies);
</script>
<style scoped></style>
