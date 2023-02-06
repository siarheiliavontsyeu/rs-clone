<template>
  <v-responsive class="mx-auto" max-width="344">
    <v-autocomplete
      class="py-2"
      v-model="select"
      v-model:search="search"
      :loading="loading"
      :items="items"
      item-title="name"
      item-value="name"
      density="compact"
      color="blue-grey-lighten-2"
      placeholder="Фильмы, сериалы, персоны"
      clearable
      autocomplete="off"
      @update:model-value="onSearch"
    >
      <template v-slot:item="{ item, props }">
        <v-list-item
        @click="$router.push({name: 'movie', params: {movieId: item.raw.id}})"
          v-bind="props"
          :prepend-avatar="item?.raw?.avatar"
          :title="item?.raw?.name"
          :subtitle="item?.raw?.group"
        >
        </v-list-item>
      </template>
    </v-autocomplete>
  </v-responsive>
</template>
<script setup lang="ts">
import { useSearchStore } from "@/stores/search";
import { watch, ref } from "vue";
type fa = { id: number; name: string };
const store = useSearchStore();
let loading = false;
let search = ref("");
let select: string;
let items: fa[] = [];
const movies = [
  { id: 1, name: "Матрица" },
  { id: 2, name: "Мстители" },
  { id: 3, name: "Жизнь пи" },
  { id: 4, name: "Пацаны" },
  { id: 5, name: "Какой-то фильм" },
  { id: 6, name: "Тарзан" },
  { id: 7, name: "Вода" },
];
watch(search, (val) => {
  val && val !== select && querySelections(val);
});

function querySelections(v: string) {
  loading = true;
  setTimeout(() => {
    items = movies.filter((e) => {
      return (e || "").name.toLowerCase().indexOf((v || "").toLowerCase()) > -1;
    });
    loading = false;
  }, 300);
}
function onSearch(){
    console.log(select);
}
</script>
