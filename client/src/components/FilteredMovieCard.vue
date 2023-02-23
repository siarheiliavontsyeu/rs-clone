<template>
  <v-card class="card">
    <div class="poster-block">
      <img :src="movie.posterUrlPreview" :alt="movie.nameRu" class="poster" />
    </div>
    <div class="info-block">
      <h3 class="text-h4 mb-2">{{ movie.nameRu }}</h3>
      <p class="text-medium-emphasis mb-2">
        {{ movie.nameOriginal }}
      </p>
      <div class="table">
        <div class="table-row">
          <p class="table-row-title text-medium-emphasis">Год производства</p>
          <p>{{ movie.year }}</p>
        </div>
        <div class="table-row">
          <p class="table-row-title text-medium-emphasis">Страна</p>
          <p>{{ countries }}</p>
        </div>
        <div class="table-row">
          <p class="table-row-title text-medium-emphasis">Жанр</p>
          <p>{{ genres }}</p>
        </div>

        <div class="table-row">
          <p class="table-row-title text-medium-emphasis">
            Рейтинг в кинопоиске
          </p>
          <p>{{ movie.ratingKinopoisk }}</p>
        </div>
        <div class="table-row">
          <p class="table-row-title text-medium-emphasis">Рейтинг в imdb</p>
          <p>{{ movie.ratingImdb || "-" }}</p>
        </div>
        <div class="table-row">
          <p class="table-row-title text-medium-emphasis">Категория</p>
          <p>{{ properMovieCategory(movie.type) }}</p>
        </div>
      </div>
    </div>
    <div class="later-btn">
      <WatchLaterButtonVue
        v-show="authStore.user"
        :movieId="String(movie.kinopoiskId)"
      />
    </div>
    <div class="more-btn">
      <v-btn
        :to="{ name: 'movie', params: { movieId: movie.kinopoiskId } }"
        variant="plain"
        append-icon="mdi-dots-horizontal-circle-outline"
        color="#f50"
        >Подробнее</v-btn
      >
    </div>
  </v-card>
</template>
<script setup lang="ts">
import type { MovieSearchByFiltersI } from "@/types/movies.types";
import { computed } from "vue";
import { properMovieCategory } from "@/helpers/composables";
import WatchLaterButtonVue from "@/components/WatchLaterButton.vue";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const props = defineProps<{ movie: MovieSearchByFiltersI }>();
const genres = computed(() => {
  return props.movie.genres.map((g) => g.genre).join(", ");
});

const countries = computed(() => {
  return props.movie.countries.map((c) => c.country).join(", ");
});
</script>
<style scoped>
.card {
  padding: 20px;
  display: grid;
  grid-template-areas:
    "p i i"
    "l . m";
  gap: 10px;
  grid-template-columns: 208px 1fr;
  margin-bottom: 10px;
  background: rgb(var(--v-theme-on-surface-variant));
}

.poster-block {
  grid-area: p;
}

.info-block {
  grid-area: i;
}

.later-btn {
  grid-area: l;
}

.more-btn {
  grid-area: m;
}

.poster {
  width: 208px;
  height: 304px;
  object-fit: contain;
}

.table-row {
  display: flex;
  margin-bottom: 10px;
}

.table-row-title {
  width: 200px;
}
</style>
