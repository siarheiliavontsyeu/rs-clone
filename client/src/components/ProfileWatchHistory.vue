<template>
  <v-container fluid>
    <v-row align="center">
      <v-col>
        <h1>История просмотров</h1>
      </v-col>
    </v-row>
    <v-row> </v-row>
  </v-container>
  <v-container fluid>
    <v-row>
      <v-col v-for="(movie, index) in movies" :key="index" cols="12" md="4">
        <v-card>
          <v-img :src="movie.posterUrlPreview" height="200px"></v-img>
          <v-card-title>
            {{ movie.nameRu }}
          </v-card-title>
          <v-card-subtitle>
            {{ movie.nameOriginal }}
          </v-card-subtitle>
          <v-card-text>
            <b>Рейтинг:</b> {{ movie.ratingKinopoisk }}
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary">Подробнее</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { MovieModel } from "../types/movies.types";
const props = defineProps<{
  movies: MovieModel[];
}>();
</script>
<style scoped></style>
