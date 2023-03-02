<template>
  <v-card>
    <v-img
      :src="movie.posterUrlPreview"
      class="align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.9)"
      height="400px"
    >
      <template v-slot:default>
        <v-card-title class="text-white">
          {{ movie.nameRu }}
        </v-card-title>
        <v-card-subtitle class="text-white">
          {{ movie.nameOriginal }}
        </v-card-subtitle>
        <v-card-text class="text-white">
          <v-progress-circular
            :model-value="movie.ratingKinopoisk * 10"
            color="amber"
            title="Рейтинг"
            size="50"
            :width="5"
            >{{ movie.ratingKinopoisk }}</v-progress-circular
          >
        </v-card-text>
        <v-card-text v-if="movie.watchedAt" class="text-white">
          <b>Дата:</b> {{ formatDate(movie.watchedAt) }}
        </v-card-text>
      </template>
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular
            color="grey-lighten-4"
            indeterminate
          ></v-progress-circular>
        </div>
      </template>
    </v-img>

    <v-card-actions>
      <v-btn
        :to="{ name: 'movie', params: { movieId: movie.kinopoiskId } }"
        prepend-icon="mdi-dots-horizontal-circle-outline"
        color="#f50"
        >Подробнее</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { formatDate } from "@/helpers/date";
import type { MovieModel } from "../types/movies.types";
defineProps<{
  movie: MovieModel;
}>();
</script>
<style></style>
