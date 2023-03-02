<template>
  <MyLoaderVue v-if="isLoading" />
  <v-container v-else class="bg-surface container">
    <v-row no-gutters>
      <v-list class="sticky">
        <v-list-item
          :to="{
            name: item.link,
          }"
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          :class="item.status"
          active-color="#f50"
          variant="plain"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon" style="margin: 0px 10px 0px 0px"></v-icon>
          </template>
          <v-list-item-title> {{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <div class="v-col rounded-lg body" style="padding: 10px; gap: 20px">
        <FilteredMovieCardVue
          :movie="movie"
          v-for="movie in properMovies"
          :key="movie.kinopoiskId"
        />
        <v-progress-circular
          v-if="isExtraLoading"
          indeterminate
          color="#f50"
          :size="50"
          class="loader"
        ></v-progress-circular>
      </div>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import MyLoaderVue from "@/components/MyLoader.vue";
import FilteredMovieCardVue from "@/components/FilteredMovieCard.vue";
import { useMoviesStore } from "@/stores/moviesStore";
import { computed, onBeforeUnmount, ref } from "vue";

const moviesStore = useMoviesStore();
const isLoading = ref(true);
const isExtraLoading = ref(false);
const currentPage = ref(1);
const items = [
  { text: "Главная", icon: "mdi-home", link: "home", status: "none" },
  {
    text: "Фильмы",
    icon: "mdi-filmstrip",
    link: "films",
    status: "active",
  },
  {
    text: "Сериалы",
    icon: "mdi-filmstrip-box-multiple",
    link: "serials",
    status: "none",
  },
  {
    text: "О проекте",
    icon: "mdi-account-group",
    link: "about",
    status: "none",
  },
];

const properMovies = computed(() => {
  return moviesStore.foundMovies
    .filter((m) => m.year !== null)
    .filter((m) => m.nameRu !== null);
});
moviesStore
  .getMovieFilters({
    type: "FILM",
    page: currentPage.value,
    order: "RATING",
    ratingFrom: 5,
    yearFrom: 2015,
    yearTo: 2022,
    ratingTo: 10,
  })
  .then(() => {
    isLoading.value = false;
  });
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
    document.documentElement.offsetHeight - 400;
  if (properMovies.value.length && properMovies.value.length >= 5) {
    if (
      bottomOfWindow &&
      moviesStore.filtersRespone.totalPages > currentPage.value
    ) {
      currentPage.value += 1;
      isExtraLoading.value = true;
      moviesStore
        .getMovieFilters({
          type: "FILM",
          page: currentPage.value,
          order: "RATING",
          ratingFrom: 5,
          yearFrom: 2015,
          yearTo: 2022,
          ratingTo: 10,
        })
        .then(() => {
          isExtraLoading.value = false;
        });
    }
  }
}, 300);
onBeforeUnmount(() => {
  moviesStore.$patch({ foundMovies: [] });
});
</script>
<style scoped>
.sticky {
  position: sticky;
  top: 50px;
  height: 500px;
}

.card {
  box-shadow: 0px 5px 5px -3px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 8px 10px 1px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0px 3px 14px 2px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
  border-radius: 1rem;
}

.sticky {
  position: sticky;
  top: 50px;
  height: 500px;
  margin-right: 50px;
}

.active {
  opacity: 1.5;
  pointer-events: all;
}

.inactive {
  opacity: 0.3;
  pointer-events: none;
}

.loader {
  left: 50%;
  transform: translateX(-50%);
}

@media (min-width: 960px) {
  .container {
    max-width: 1280px;
  }
}
</style>
