<template>
  <v-container v-if="movieStore.distribution.length">
    <div>
      <div class="premiere">
        <h6>Мировая премьера</h6>
        <p>{{ personDate(movieStore.worldPremiere?.date!, false) }}</p>
        <p>
          <span
            class="mr-2"
            v-for="company in movieStore.worldPremiere?.companies"
            :key="company.name"
            >{{ company.name }}</span
          >
        </p>
      </div>
      <ul class="premiere-list">
        <li
          v-for="(premiere, index) in movieStore.allPremieres"
          :key="index"
          v-show="premiere.country"
        >
          <div class="premiere">
            <h6>{{ premiere.country?.country }}</h6>
            <p>{{ personDate(premiere?.date, false) }}</p>
            <p>
              <span
                class="mr-2"
                v-for="company in premiere.companies"
                :key="company.name"
                >{{ company.name }}</span
              >
            </p>
          </div>
        </li>
      </ul>
    </div>
  </v-container>
  <v-container v-else>
    <h6 class="text-h6">
      К сожалению, у нас нет изображений связанных с этим фильмом
    </h6>
  </v-container>
</template>
<script setup lang="ts">
import { useMovieStore } from "@/stores/movieStore";

import { personDate } from "@/helpers/date";

const movieStore = useMovieStore();
</script>
<style scoped>
.premiere-list {
  list-style-type: none;
}

.premiere {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
}
</style>
