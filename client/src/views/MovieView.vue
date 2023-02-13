<template>
  <MyLoaderVue v-if="searchStore.isLoading" />
  <v-container v-else class="container">
    <v-container class="movie-basic">
      <div class="movie-poster">
        <img :src="movieStore.movie.posterUrlPreview" :alt="movieStore.movie.nameEn" class="poster">
      </div>
      <div class="movie-info">
        <div class="info-header">
          <h1 class="text-h3 font-weight-bold">
            {{ movieStore.movie.nameRu }}
          </h1>
          <h4 class="text-medium-emphasis">{{ movieStore.movie.nameOriginal }}</h4>
        </div>
        <div>
          <h6 class="text-h5 font-weight-bold movie-desc-title">О фильме</h6>
          <div class="table">
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Год производства</p>
              <p>{{ movieStore.movie.year }}</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Страна</p>
              <p>{{ countries }}
              </p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Жанр</p>
              <p>{{ genres }}</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Слоган</p>
              <p>{{ movieStore.movie.slogan || '—' }}</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Режиссер</p>
              <p>Режиссеры</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Сценарий</p>
              <p>Сценарий</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Продюсер</p>
              <p>Продюсер</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Оператор</p>
              <p>Оператор</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Композитор</p>
              <p>Композитор</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Художник</p>
              <p>Художник</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Монтаж</p>
              <p>Монтаж</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Бюджет</p>
              <p>Бюджет</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Маркетинг</p>
              <p>Маркетинг</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Сборы в США</p>
              <p>Сборы в США</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Сборы в мире</p>
              <p>Сборы в мире</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Премьера в мире</p>
              <p>Премьера в мире</p>
            </div>
            <div class="table-row" v-show="movieStore.movie.ratingAgeLimits">
              <p class="table-row-title text-medium-emphasis">Возраст</p>
              <p>{{ movieStore.movie.ratingAgeLimits }}</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Рейтинг MPAA</p>
              <p class="ratingMpaa">
                <span class="mpaa"> {{ properRatingMpaa(movieStore.movie.ratingMpaa)[0] }}</span>
                <span class="mpaa-text">{{ properRatingMpaa(movieStore.movie.ratingMpaa)[1] }}</span>
              </p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Время</p>
              <p>{{ movieLength }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="movie-main-actors">Actors</div>

    </v-container>
  </v-container>
</template>
<script setup lang="ts">
import { watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useMovieStore } from "@/stores/movieStore";
import { useSearchStore } from "@/stores/searchStore";
import MyLoaderVue from "@/components/MyLoader.vue";
import { properRatingMpaa } from '@/helpers/composables';

const movieStore = useMovieStore();
const searchStore = useSearchStore();
const route = useRoute();

const genres = computed(() => {
  return movieStore.movie.genres.map(g => g.genre).join(', ');
})

const countries = computed(() => {
  return movieStore.movie.countries.map(c => c.country).join(', ');
})

const movieLength = computed(() => {
  const length = movieStore.movie.filmLength
  return `${length} мин. / 0${Math.trunc(length / 60)}:${length % 60}`
})

watch(
  () => route.params.movieId,
  (newValue, oldValue) => {
    if (newValue !== oldValue && newValue) {
      movieStore.getAllInfo(Number(newValue));
    }
  },
  { deep: true }
);

movieStore.getAllInfo(Number(route.params.movieId));
</script>

<style scoped>
.container {
  background-color: rgb(var(--v-theme-background));
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.movie-basic {
  display: flex;
  align-items: start;
}

.poster {
  margin-right: 40px;
}

.movie-info {
  margin-right: 70px;
}

.info-header {
  margin-bottom: 40px;
}

.movie-desc-title {
  margin-bottom: 20px;
}

.table-row {
  display: flex;
  margin-bottom: 10px;
}

.table-row-title {
  width: 160px;
}

.mpaa {
  border: 1px solid rgb(var(--v-border-color));
  padding: 2px;
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;
  margin-right: 5px;
}

.mpaa-text {
  visibility: hidden;
  opacity: 0;
}

.ratingMpaa:hover .mpaa-text {
  visibility: visible;
  opacity: 0.3;
}
</style>
