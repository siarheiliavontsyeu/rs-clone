<template>
  <v-container class="container">
    <v-card class="header">
      <div class="header-title">
        <h4 class="text-h5">Расширенный поиск</h4>
      </div>
      <div class="header-subtitle">
        <h4 class="text-subtitle-2 text-medium-emphasis">
          Поиск фильмов, персоналий, пользователей cайта, киностудий и т.д.
        </h4>
      </div>
    </v-card>
    <v-card class="options">
      <h5 class="mb-5">Фильтры</h5>
      <div>
        <v-autocomplete label="Страна" :hide-no-data="true" variant="solo" clearable aria-autocomplete="false"
          v-model="chosenCountry" :items="moviesStore.sortedCountries" item-title="country" item-value="id">
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :title="item?.raw?.country"></v-list-item> </template></v-autocomplete>
      </div>
      <div>
        <v-autocomplete label="Жанр" :hide-no-data="true" variant="solo" clearable v-model="chosenGenre"
          :items="moviesStore.sortedGenres" item-title="genre" item-value="id">
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :title="item?.raw?.genre"></v-list-item></template></v-autocomplete>
      </div>
      <div>
        <v-select label="Категория" :hide-no-data="true" variant="solo" v-model="chosenCategory" :items="categories"
          item-title="title" item-value="value">
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :title="item?.raw?.title"></v-list-item></template></v-select>
      </div>
      <div class="mb-10">
        <h6 class="mb-2">Год</h6>
        <DualSlider ref="yearSlider" :min-period="1886" :max-period="new Date().getFullYear() + 1"
          @slider-change="onYearChange">
        </DualSlider>
      </div>
      <div class="mb-10">
        <h6 class="mb-2">Рейтинг</h6>
        <DualSlider ref="ratingSlider" :min-period="0" :max-period="10" @slider-change="onRatingChange">
        </DualSlider>
      </div>
      <div>
        <h6 class="mb-2">Сортировка</h6>
        <v-radio-group inline v-model="sortBy">
          <v-radio label="По рейтингу" density="compact" color="#f50" value="RATING"></v-radio>
          <v-radio label="По годам" density="compact" color="#f50" value="YEAR"></v-radio>
        </v-radio-group>
      </div>
      <div class="buttons">
        <v-btn width="100%" color="info" append-icon="mdi-magnify" @click="onRequestMovies" class="mb-2">Найти</v-btn>
        <v-btn width="100%" color="error" append-icon="mdi-backspace" @click="onFilterChange">Очистить</v-btn>
      </div>
    </v-card>
    <v-card class="movies">
      <MyLoaderVue v-if="isLoading" />
      <div v-else>
        <div v-show="!isEmpty && !properMovies.length">
          <h3 class="text-h3 empty">Найденных фильмов нет</h3>
        </div>
        <div v-if="isEmpty">
          <h3 class="text-h3 empty">Что будем искать?</h3>
        </div>
        <div v-else>
          <FilteredMovieCardVue :movie="movie" v-for="movie in properMovies" :key="movie.kinopoiskId" />
        </div>
      </div>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import DualSlider from "@/components/DualSlider.vue";
import FilteredMovieCardVue from "@/components/FilteredMovieCard.vue";
import { useMoviesStore } from "@/stores/moviesStore";
import { MovieTypeEnum } from "@/types/movies.types";
import MyLoaderVue from "@/components/MyLoader.vue";
import { computed, ref } from "vue";

const moviesStore = useMoviesStore();
const chosenCountry = ref();
const chosenGenre = ref();
const categories = [
  { title: "Все", value: "ALL" },
  { title: "Полнометражный", value: MovieTypeEnum.film },
  { title: "Сериалы", value: MovieTypeEnum.tvSeries },
  { title: "Шоу", value: MovieTypeEnum.tvShow },
  { title: "Короткометражный", value: MovieTypeEnum.miniSeries },
];
const chosenCategory = ref(categories[0].value);
const chosenMinYear = ref(1886);
const chosenMaxYear = ref(new Date().getFullYear() + 1);
const chosenMinRating = ref(0);
const chosenMaxRating = ref(10);
const sortBy = ref("RATING");
const currentPage = ref(1);
const isEmpty = ref(true);
const isLoading = ref(false);

const properMovies = computed(() => {
  return moviesStore.foundMovies.filter((m) => m.year !== null);
});

const yearSlider = ref<InstanceType<typeof DualSlider>>();
const ratingSlider = ref<InstanceType<typeof DualSlider>>();

const onYearChange = (minYear: number, maxYear: number) => {
  chosenMinYear.value = minYear;
  chosenMaxYear.value = maxYear;
};
const onRatingChange = (minRating: number, maxRating: number) => {
  chosenMinRating.value = minRating;
  chosenMaxRating.value = maxRating;
};

const onFilterChange = () => {
  chosenCountry.value = null;
  chosenGenre.value = null;
  chosenCategory.value = categories[0].value;
  chosenMinYear.value = 1886;
  chosenMaxYear.value = new Date().getFullYear() + 1;
  chosenMinRating.value = 0;
  chosenMaxRating.value = 10;
  sortBy.value = "RATING";
  yearSlider.value?.onSliderClear();
  ratingSlider.value?.onSliderClear();
};

const onRequestMovies = () => {
  isEmpty.value = false;
  isLoading.value = true;
  currentPage.value = 1;
  moviesStore
    .getMovieFilters({
      country: chosenCountry.value,
      genre: chosenGenre.value,
      order: sortBy.value,
      type: chosenCategory.value,
      ratingFrom: chosenMinRating.value,
      ratingTo: chosenMaxRating.value,
      yearFrom: chosenMinYear.value,
      yearTo: chosenMaxYear.value,
      page: 1,
    })
    .then(() => {
      isLoading.value = false;
    });
};
function debounce(fn: (this: Window, ev: Event) => any, wait: number) {
  let timer: any;
  return function (args: Event) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.call(window, args);
    }, wait);
  };
}
window.onscroll = debounce(() => {
  let bottomOfWindow =
    document.documentElement.scrollTop + window.innerHeight >=
    document.documentElement.offsetHeight - 1;
  if (properMovies.value.length && properMovies.value.length >= 20) {
    if (
      bottomOfWindow &&
      moviesStore.filtersRespone.totalPages > currentPage.value
    ) {
      currentPage.value += 1;
      moviesStore.getMovieFilters({
        country: chosenCountry.value,
        genre: chosenGenre.value,
        order: sortBy.value,
        type: chosenCategory.value,
        ratingFrom: chosenMinRating.value,
        ratingTo: chosenMaxRating.value,
        yearFrom: chosenMinYear.value,
        yearTo: chosenMaxYear.value,
        page: currentPage.value,
      });
    }
  }
}, 300);
</script>
<style scoped>
.container {
  display: grid;
  grid-template-areas:
    "h h"
    "o m";
  background-color: rgb(var(--v-theme-background));
  grid-template-columns: 1fr 3fr;
  gap: 20px;
  padding: 40px;
}

.header {
  grid-area: h;
  padding: 20px;
}

.options {
  grid-area: o;
  padding: 20px;
  position: sticky;
}

.movies {
  grid-area: m;
  padding: 20px;
}

.empty {
  text-align: center;
  vertical-align: center;
}

.loader {
  left: 50%;
  transform: translateX(-50%);
}

@media(min-width:960px) {
  .container {
    max-width: 1280px;
  }
}
</style>
