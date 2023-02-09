<template>
  <div class="container">
    <v-menu :value="4">
      <template v-slot:activator="{ props }">
        <input class="search_field" v-bind="props" v-model="search" />
      </template>
      <v-list class="options" v-if="moviesList.length && personsList.length">
        <v-list-item value="movies-options">Фильмы</v-list-item>
        <SearchFieldOptionCard v-for="item in moviesList" :key="item.id" :item="item" :value="item.id"
          @clear='onClear' />
        <v-list-item value="persons-options">Персоны</v-list-item>
        <SearchFieldOptionCard v-for="item in personsList" :key="item.id" :item="item" :value="item.id"
          @clear="onClear" />
      </v-list>
      <v-list v-else>
        <v-list-item value="nodata">No data</v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script setup lang="ts">
import { useSearchStore } from "@/stores/searchStore";
import { reactive, ref, watch } from "vue";
import SearchFieldOptionCard from "@/components/SearchFieldOptionCard.vue";
type listTypes = {
  id: number;
  nameRu: string;
  nameEn: string;
  img: string;
  isMovie: boolean;
};

const searchStore = useSearchStore();
let search = ref("");
const keyword = ref("");
let moviesList: listTypes[] = reactive([]);
let personsList: listTypes[] = reactive([]);
watch(keyword, (newValue) => {
  if (newValue) {
    searchStore.getDataBySearch(newValue);
    onFilter();
  } else {
    moviesList = [];
    personsList = [];
  }
});
watch(search, () => {
  onChange();
});
const onFilter = () => {
  moviesList = searchStore.moviesList.map((movie) => ({
    id: movie.filmId,
    nameRu: movie.nameRu,
    nameEn: movie.nameEn,
    img: movie.posterUrl,
    isMovie: true,
  }));
  personsList = searchStore.personsList.map((person) => ({
    id: person.kinopoiskId,
    nameRu: person.nameRu,
    nameEn: person.nameEn,
    img: person.posterUrl,
    isMovie: false,
  }));
};
const onChange = () => {
  setTimeout(() => {
    keyword.value = search.value;

  }, 300);
};
const onClear = () => {
  search.value = '';
}
</script>
<style .scoped>
.container {
  display: flex;
  justify-content: space-around;
  width: 20vw;
}

.search_field {
  width: 100%;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 4px;
  outline-color: rgb(98, 0, 238);
}

.search_field:focus {
  border: 1px solid gray;
}

.options {
  margin-top: 40px;
}
</style>
