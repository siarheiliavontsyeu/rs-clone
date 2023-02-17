<template>
  <v-container fluid>
    <v-row align="center">
      <v-col>
        <h2>Мои рецензии</h2>
      </v-col>
    </v-row>
    <v-row> </v-row>
  </v-container>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="(movie, index) in reviews"
        :key="index"
        cols="12"
        sm="6"
        md="3"
        lg="2"
      >
        <v-card
          v-if="movie.critique"
          class="review"
          :class="movie.critique.type"
        >
          <v-card-title>
            <router-link
              :to="{ name: 'movie', params: { movieId: movie.kinopoiskId } }"
              ><v-img :src="movie.posterUrlPreview" height="100px"></v-img
            ></router-link>
          </v-card-title>
          <v-card-text>
            <v-expansion-panels>
              <v-expansion-panel
                :title="movie.critique.title || 'Отзыв'"
                :text="movie.critique.text"
              >
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
          <v-card-text>
            {{ formatDate(movie.critique.at) }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import type { MovieModel, ProfileCritiqueModel } from "../types/movies.types";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";
import { computed } from "vue";
import { formatDate } from "@/helpers/date";
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const props = defineProps<{
  movies: MovieModel[];
}>();

const reviews = computed<ProfileCritiqueModel[]>(() => {
  return props.movies.map((movie) => {
    return {
      kinopoiskId: movie.kinopoiskId,
      imdbId: movie.imdbId,
      nameRu: movie.nameRu,
      nameOriginal: movie.nameOriginal,
      posterUrlPreview: movie.posterUrlPreview,
      ratingKinopoisk: movie.ratingKinopoisk,
      review: movie.reviews.find((m) => m.userId === user.value?.id),
      critique: movie.critiques.find((c) => c.userId === user.value?.id),
      watchedAt: movie.watchedAt,
    };
  });
});
</script>
<style scoped>
.review {
  padding: 16px 24px;
  margin-bottom: 10px;
}

.positive {
  background-color: rgba(59, 179, 59, 0.1);
}

.negative {
  background-color: rgba(255, 0, 0, 0.08);
}

.neutral {
  background-color: rgba(0, 0, 0, 0.05);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid rgb(var(--v-theme-on-surface-variant));
  padding-bottom: 20px;
}
</style>
