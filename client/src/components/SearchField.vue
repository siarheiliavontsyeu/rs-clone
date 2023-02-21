<template>
  <div class="container">
    <v-menu :value="4">
      <template v-slot:activator="{ props }">
        <div class="d-flex flex-column">
          <input class="search_field" v-bind="props" v-model="search" />
          <v-progress-linear
            v-show="search"
            indeterminate
            color="#f50"
            rounded
          ></v-progress-linear>
        </div>
      </template>
      <v-list
        class="options"
        v-if="searchStore.movies.length && searchStore.persons"
      >
        <v-list-item value="movies-options">Фильмы</v-list-item>
        <SearchFieldOptionCard
          v-for="item in searchStore.movies"
          :key="item.id"
          :item="item"
          :value="item.id"
          @clear="onFieldClear"
        />
        <v-list-item value="persons-options">Персоны</v-list-item>
        <SearchFieldOptionCard
          v-for="item in searchStore.persons"
          :key="item.id"
          :item="item"
          :value="item.id"
          @clear="onFieldClear"
        />
      </v-list>
      <v-list class="no_options" v-else>
        <v-list-item value="nodata">No data</v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script setup lang="ts">
import { useSearchStore } from "@/stores/searchStore";
import { reactive, ref, watch } from "vue";
import SearchFieldOptionCard from "@/components/SearchFieldOptionCard.vue";
import { debounce } from "@/helpers/debounce";
export type itemType = {
  id: number;
  nameRu: string;
  nameEn: string;
  img: string;
  isMovie: boolean;
};

const searchStore = useSearchStore();
let search = ref("");

watch(search, (newValue) => {
  debouncedFetch(newValue);
});
const debouncedFetch = debounce((value) => {
  searchStore.getDataBySearch(value);
}, 500);
const onFieldClear = () => {
  search.value = "";
};
</script>
<style scoped>
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
  outline-color: #f50;
}

.search_field:focus {
  border: 1px solid gray;
}

.options {
  margin-top: 40px;
}

.no_options {
  margin-top: 10px;
}
</style>
