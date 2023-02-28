<template>
  <MyLoaderVue v-if="isLoading" />
  <v-container class="bg-surface container" v-else>
    <v-row no-gutters>
      <v-list> <v-list-item @click="$router.push({ name: item.link })" v-for="(item, i) in items" :key="i" :value="item"
          :class="item.status" active-color="primary" variant="plain">
          <template v-slot:prepend>
            <v-icon :icon="item.icon" style="margin: 0px 10px 0px 0px"></v-icon>
          </template>
          <v-list-item-title> {{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <div class="v-col rounded-lg h-screen w-75 h-100 d-flex flex-column justify-center align-center"
        style="padding: 10px; gap: 40px">

        <card-home class="w-100" :movieProps="movieStore.highlightedMovie"></card-home>

        <SlideGroup class="w-100" :moviesProps="filteredTop100">
          Топ 100 >
        </SlideGroup>

        <SlideGroupWatchLater color="grey-darken-3" v-if="authStore.user && userDataStore.watchLater.length" class="w-100"
          :moviesProps="userDataStore.watchLater">
          Посмотреть позже >
        </SlideGroupWatchLater>

        <SlideGroup class="w-100" :moviesProps="filteredTop250">
          Топ 250 >
        </SlideGroup>

        <SlideGroup class="w-100" :moviesProps="filteredTopAwait">
          Топ Ожидания >
        </SlideGroup>
        <CalendarReleses class="w-100"> </CalendarReleses>
      </div>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import {
  MoviesTopTypesEnum,
  type MovieFromCollectionI,

} from "@/types/movies.types";
import SlideGroup from "@/components/SlideGroup.vue";
import SlideGroupWatchLater from "@/components/SlideGroupWatchLater.vue";
import CalendarReleses from "@/components/CalendarReleses.vue";
import CardHome from "@/components/CardHome.vue";
import { useAuthStore } from "@/stores/authStore";
import { useMoviesStore } from "@/stores/moviesStore";
import { useMovieStore } from "@/stores/movieStore";
import { computed, ref } from "vue";
import { useUserDataStore } from "@/stores/userDataStore";
import MyLoaderVue from "@/components/MyLoader.vue";

const moviesStore = useMoviesStore();
const movieStore = useMovieStore();
const userDataStore = useUserDataStore();

const top100 = ref<MovieFromCollectionI[]>([]);
const top250 = ref<MovieFromCollectionI[]>([]);
const topAwait = ref<MovieFromCollectionI[]>([]);
const isLoading = ref(true);
const filteredTop100 = computed(() => {
  return top100.value.filter((m) => m.nameRu !== null);
});
const filteredTop250 = computed(() => {
  return top250.value.filter((m) => m.nameRu !== null);
});

const filteredTopAwait = computed(() => {
  return topAwait.value.filter((m) => m.nameRu !== null);
});

const items = [
  { text: "Главная", icon: "mdi-home", link: "home", status: "active" },
  {
    text: "Фильмы",
    icon: "mdi-filmstrip",
    link: "films",
    status: "none",
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

const month = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

const date = new Date();
const authStore = useAuthStore();
const addNewMonthFilms = (trigger = false) => {
  if (trigger) {
    if (month[date.getMonth() + 1] === undefined) {
      moviesStore.getPremiereMovies(date.getFullYear() + 1, month[0]);
    } else {
      moviesStore.getPremiereMovies(
        date.getFullYear(),
        month[date.getMonth() + 1],
      );
    }
  } else {
    moviesStore.getPremiereMovies(
      date.getFullYear(),
      month[date.getMonth()],
    );
  }
};
function getAll() {
  movieStore.getHighlightedMovie(),
    moviesStore.getMovies(MoviesTopTypesEnum.top100).then((res) => {
      top100.value = res;
    }),
    moviesStore.getMovies(MoviesTopTypesEnum.top250).then((res) => {
      top250.value = res;
    }),
    moviesStore.getMovies(MoviesTopTypesEnum.topAwait).then((res) => {
      topAwait.value = res;
      isLoading.value = false
    }),
    addNewMonthFilms(true);
}
getAll(); 
</script>

<style lang="css" scoped>
.wrapper-card {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 0;
  background: linear-gradient(90deg,
      #000 6.25%,
      #000 6.26%,
      rgba(0, 0, 0, 0.99) 14.15%,
      rgba(0, 0, 0, 0.961) 20.77%,
      rgba(0, 0, 0, 0.915) 26.27%,
      rgba(0, 0, 0, 0.856) 30.8%,
      rgba(0, 0, 0, 0.785) 34.5%,
      rgba(0, 0, 0, 0.705) 37.54%,
      rgba(0, 0, 0, 0.619) 40.06%,
      rgba(0, 0, 0, 0.529) 42.21%,
      rgba(0, 0, 0, 0.437) 44.15%,
      rgba(0, 0, 0, 0.347) 46.03%,
      rgba(0, 0, 0, 0.261) 47.99%,
      rgba(0, 0, 0, 0.18) 50.2%,
      rgba(0, 0, 0, 0.108) 52.79%,
      rgba(0, 0, 0, 0.047) 55.94%,
      transparent 59.77%);
  background-size: 150%;
  background-repeat: no-repeat;
}

.card {
  box-shadow: 0px 5px 5px -3px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 8px 10px 1px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0px 3px 14px 2px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
  border-radius: 1rem;
}

.card-body {
  position: relative;
  padding: 0px 0px 30px 30px;
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  color: white;
  z-index: 10;
}

.card-logo {
  cursor: pointer;
}


.sticky {
  position: sticky;
  top: 50px;
  height: 500px;
}

.inactive {
  opacity: 0.3;
  pointer-events: none;
}

.active {
  opacity: 1.5;
  pointer-events: all;
}

@media (min-width: 960px) {
  .container {
    max-width: 1280px;
  }
}

.card-logo {
  cursor: pointer;
}

.inactive {
  opacity: 0.3;
  pointer-events: none;
}

.active {
  opacity: 1.5;
  pointer-events: all;
}

.active:hover {}

@media (min-width:960px) {
  .container {
    max-width: 1280px;
  }
}
</style>
