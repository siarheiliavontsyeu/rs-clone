<template>
  <v-card>
    <v-img :src="movie.posterUrlPreview" height="200px"></v-img>
    <v-card-title>
      {{ movie.nameRu }}
    </v-card-title>
    <v-card-subtitle>
      {{ movie.nameOriginal }}
    </v-card-subtitle>
    <v-card-text> <b>Рейтинг:</b> {{ movie.ratingKinopoisk }} </v-card-text>
    <v-card-text v-if="movie.watchedAt">
      <b>Дата:</b> {{ formatDate(movie.watchedAt) }}
    </v-card-text>
    <v-card-actions>
      <RouterLink
        :to="{ name: 'movie', params: { movieId: movie.kinopoiskId } }"
        >Подробнее</RouterLink
      >
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { formatDate } from "@/helpers/date";
import type { MovieModel } from "../types/movies.types";
const props = defineProps<{
  movie: MovieModel;
}>();
</script>
<style></style>
