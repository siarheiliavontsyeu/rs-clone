<template>
  <MyLoaderVue v-if="searchStore.isLoading" />
  <v-container v-else class="container">
    <v-container class="body">
      <div class="avatar">
        <img class="avatar-img" :src="personStore.person.posterUrl" :alt="personStore.person.nameRu" />
      </div>
      <div>
        <div class="meta-header">
          <h1 class="text-h2 font-weight-bold">
            {{ personStore.person.nameRu }}
          </h1>
          <h4 class="text-medium-emphasis">{{ personStore.person.nameEn }}</h4>
        </div>
        <div>
          <h6 class="text-h5 font-weight-bold person-title">О персоне</h6>
          <div class="table">
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Карьера</p>
              <p>{{ personStore.person.profession }}</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Рост</p>
              <p>{{ height }}</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Пол</p>
              <p>{{ gender }}</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Дата рождения</p>
              <p>
                <span>{{ birthdate[0] }}</span>
                <span> • </span>
                <span class="text-medium-emphasis font-weight-light">{{ birthdate[1] }} от роду</span>
              </p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Место рождения</p>
              <p>{{ personStore.person.birthplace }}</p>
            </div>
            <div class="table-row" v-show="personStore.person.death">
              <p class="table-row-title text-medium-emphasis">Дата смерти</p>
              <p>
                <span>{{ deathdate }}</span>
              </p>
            </div>
            <div class="table-row" v-show="personStore.person.deathplace">
              <p class="table-row-title text-medium-emphasis">Место смерти</p>
              <p>{{ personStore.person.deathplace }}</p>
            </div>
            <div class="table-row" v-show="personStore.person.hasAwards">
              <p class="table-row-title text-medium-emphasis">
                Количество наград
              </p>
              <p>{{ personStore.person.hasAwards }}</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Супруг/супруга</p>
              <div class="spouses">
                <div class="d-flex" v-for="spouse in personStore.person.spouses" :key="spouse.personId">
                  <p class="mr-1">{{ spouse.name }}</p>
                  <span class="text-medium-emphasis font-weight-light" v-if="spouse.divorced">({{ spouse.divorcedReason
                  }})</span>
                  <span class="text-medium-emphasis font-weight-light" v-else>{{ spouse.children }}
                    {{ spouse.children === 1 ? "ребенок" : "детей" }}</span>
                </div>
              </div>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Всего фильмов</p>
              <p>{{ personStore.person.films.length }}</p>
            </div>
          </div>
        </div>
      </div>
    </v-container>
    <v-container class="facts" v-show="personStore.person.facts.length">
      <div>
        <h4 class="text-h2 font-weight-bold mb-2">Знаете ли вы, что...</h4>
        <ul class="facts-list">
          <li class="fact text-subtitle-2" v-for="(fact, index) in personStore.person.facts" :key="index">
            {{ fact }}
          </li>
        </ul>
      </div>
    </v-container>
    <v-container class="movies">
      <div class="professions">
        <ul class="professions-list">
          <li v-for="profession in personStore.professionKeys" :key="profession" class="profession"
            :class="{ active: personStore.currentProfession === profession }" @click="onProfessionChange(profession)">
            <div class="profession-title">
              {{ professionInRu(profession) }}
            </div>
            <div class="profession-subtitle">
              {{ personStore.moviesByProfessionCount(profession) }}
            </div>
          </li>
        </ul>
      </div>
      <div class="movies-container">
        <ul class="movies-list">
          <li v-for="(movie, index) in personStore.moviesByProfession" :key="movie.filmId" class="movie" @click="
            $router.push({ name: 'movie', params: { movieId: movie.filmId } })
          ">
            <div class="movie-name">
              <div class="text-h6" :class="{ top: index < 10 }">
                {{ movie.nameRu }}
              </div>
              <div class="text-subtitle-2 text-medium-emphasis">
                {{ movie.nameEn }}
              </div>
            </div>
            <div class="movie-meta">
              <div class="text-subtitle-1">{{ movie.description }}</div>
              <div class="text-medium-emphasis font-weight-light">
                {{ professionInRu(movie.professionKey) }}
              </div>
            </div>
            <div class="movie-rating">
              <div class="text-h4" :class="ratingColor(movie.rating)">
                {{ movie.rating }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </v-container>
  </v-container>
</template>
<script setup lang="ts">
import { watch, computed } from "vue";
import { useRoute } from "vue-router";
import { usePersonStore } from "@/stores/personStore";
import { useSearchStore } from "@/stores/searchStore";
import MyLoaderVue from "@/components/MyLoader.vue";
import { personDate } from "@/helpers/date";
import { professionInRu, ratingColor } from "@/helpers/composables";
import { GenderTypeEnum } from "@/types/movies.types";
import { useMoviesStore } from "@/stores/moviesStore";

const route = useRoute();
const searchStore = useSearchStore();
const personStore = usePersonStore();
const moviesStore = useMoviesStore();
const personId = route.params.nameId;

const gender = computed(() => {
  return personStore.person.sex === GenderTypeEnum.male ? "мужской" : "женский";
});

const height = computed(() => {
  const h = Number(personStore.person.growth);
  return `${h / 100} м`;
});

const birthdate = computed(() => {
  return personDate(personStore.person.birthday);
});

const deathdate = computed(() => {
  return personDate(personStore.person.death, false);
});

const onProfessionChange = (profession: string) => {
  personStore.setCurrentProfession(profession);
};
watch(
  () => route.params.nameId,
  (newValue, oldValue) => {
    if (newValue !== oldValue && newValue) {
      getPerson(Number(newValue));
    }
  },
  { deep: true }
);

function getPerson(id: number) {
  personStore
    .getStaffPerson(id)
    .then((data) => (document.title = data));
}
getPerson(Number(route.params.nameId))

</script>
<style scoped>
.container {
  background-color: rgb(var(--v-theme-background));
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.body {
  width: 80%;
  display: flex;
}

.avatar {
  margin-right: 80px;
}

.avatar-img {
  width: 340px;
  height: 500px;
}

.meta-header {
  margin-bottom: 40px;
}

.person-title {
  margin-bottom: 20px;
}

.table-row {
  display: flex;
  margin-bottom: 10px;
}

.table-row-title {
  width: 160px;
}

.facts {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.facts-list {
  list-style-type: circle;
}

.fact {
  border-bottom: 1px solid #eee;
  padding: 10px;
}

.fact:last-of-type {
  border: none;
}

.movies {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.movies-container {
  width: 100%;
}

.movies-list {}

.movie {
  display: grid;
  width: 70%;
  margin: 0 auto;
  grid-template-columns: 3fr 2fr 1fr;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.movie:hover {
  transform: scale(1.2);
  color: #f50;
  transition: all 0.3s;
}

.top {
  background: linear-gradient(165deg, #ffd25e 16.44%, #b59646 63.42%);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}

.professions {
  margin-bottom: 20px;
}

.professions-list {
  display: flex;
  list-style-type: none;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;

  overflow-x: auto;
  white-space: nowrap;
  max-width: 1000px;
  scroll-behavior: smooth;
}

.professions-list::-webkit-scrollbar {
  height: 8px;
  width: 100%;
  border: none;
}

.professions-list::-webkit-scrollbar-thumb:horizontal {
  background: #000;
  border-radius: 10px;
}

.profession {
  margin-right: 35px;
  display: flex;
  flex-direction: column;
  align-items: start;
  cursor: pointer;
  white-space: wrap;
}

.profession-title {
  opacity: 0.6;
  font-size: 24px;
  font-weight: 600;
}

.profession-subtitle {
  color: #777;
  font-size: 13px;
}

.profession.active {
  border-bottom: 3px solid #f50;
}

.profession:hover .profession-title,
.profession:hover .profession-subtitle {
  opacity: 1;
  color: var(--color-text);
  transition: all 0.3s;
}

.active .profession-title,
.active .profession-subtitle {
  opacity: 1;
  color: var(--color-text);
}

@media (min-width: 960px) {
  .container {
    max-width: 1280px;
  }
}

@media (max-width: 970px) {
  .professions-list {
    width: 850px;
  }
}
</style>
