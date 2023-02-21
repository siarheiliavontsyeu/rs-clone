<template>
  <v-container>
    <v-row align="center">
      <v-col>
        <h2 class="text-center">Мои рецензии</h2>
      </v-col>
    </v-row>
    <v-row> </v-row>
  </v-container>
  <v-container>
    <v-row>
      <v-col
        v-for="(movie, index) in reviews"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
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
            {{ movie.nameRu }}
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
  const reviews = props.movies
    .map((movie) => {
      const critique = movie.critiques.find((c) => c.userId === user.value?.id);
      const review = movie.reviews.find((m) => m.userId === user.value?.id);
      if (critique) {
        return {
          ...movie,
          critique,
          review,
        };
      }
      return null;
    })
    .filter(Boolean);

  return reviews;
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
