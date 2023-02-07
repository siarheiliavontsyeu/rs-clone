<template>
  <v-responsive class="mx-auto" max-width="344">
    <v-autocomplete class="py-2" v-model="select" v-model:search="search" :loading="loading" :items="items"
      item-title="nameRu" item-value="nameRu" density="compact" color="blue-grey-lighten-2"
      placeholder="Фильмы, сериалы, персоны" clearable autocomplete="off">
      <template v-slot:item="{ item, props }">
        <v-list-item @click="navigateTo(item)" v-bind="props" :prepend-avatar="item?.raw?.img"
          :title="item?.raw?.nameRu" :subtitle="item?.raw?.nameEn">
        </v-list-item>
      </template>
    </v-autocomplete>
  </v-responsive>
</template>
<script setup lang="ts">
import { usePersonStore } from "@/stores/personStore";
import { useSearchStore } from "@/stores/searchStore";
import { watch, ref } from "vue";
import { useRouter } from "vue-router";
type listTypes = {
  id: number;
  nameRu: string;
  nameEn: string;
  img: string;
  isMovie: boolean;
};
const searchStore = useSearchStore();
const personStore = usePersonStore();
const router = useRouter();
let loading = false;
let search = ref("");
let select: string;
let searchText = ref("");
let items: listTypes[] = [];
watch(search, (val) => {
  val && val !== select && querySelections();
});

watch(searchText, (val) => {
  loading = true;
  setTimeout(() => {
    searchStore.getDataBySearch(val).then(() => {
      loading = false;
    });
  }, 500);
  const moviesList = searchStore.moviesList.map((movie) => ({
    id: movie.filmId,
    nameRu: movie.nameRu,
    nameEn: movie.nameEn,
    img: movie.posterUrl,
    isMovie: true,
  }));
  const personsList = searchStore.personsList.map((person) => ({
    id: person.kinopoiskId,
    nameRu: person.nameRu,
    nameEn: person.nameEn,
    img: person.posterUrl,
    isMovie: false,
  }));
  items = [...moviesList, ...personsList];
});

function querySelections() {
  searchText.value = search.value;
}

function navigateTo(item: any) {
  if (item.raw.isMovie) {
    router.replace({ name: "movie", params: { movieId: item.raw.id } })
  } else {
    personStore.setPersonId(item.raw.id)
    router.replace({ name: "name", params: { nameId: item.raw.id } })
  }
}
</script>
