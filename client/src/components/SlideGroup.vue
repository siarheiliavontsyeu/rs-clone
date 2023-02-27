<template>
  <v-sheet class="container-slider mx-auto" elevation="8">
    <h2>
      <slot></slot>
    </h2>
    <v-slide-group class="pa-1" selected-class="bg-success" show-arrows>
      <v-slide-group-item v-for="movie in moviesProps" :key="movie.filmId">
        <v-card
          @click="
            $router.push({
              name: 'movie',
              params: { movieId: movie.filmId },
            })
          "
          color="grey-lighten-1"
          class="ma-3"
          height="250"
          width="190"
        >
          <div
            class="card-film"
            :style="{
              background: `url(${movie.posterUrlPreview})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
            }"
          >
            <div class="rating">
              {{ movie.rating }}
            </div>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script lang="ts" setup>
import type { MovieFromCollectionI } from "@/types/movies.types";

defineProps<{ moviesProps: MovieFromCollectionI[] }>();
</script>

<style lang="css" scoped>
.container-slider {
  box-shadow: 0px 5px 5px -3px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 8px 10px 1px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0px 3px 14px 2px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
  border-radius: 1rem;
}

h2 {
  margin: 20px 10px 0px 20px;
  padding: 10px 0 0 0;
}

.v-card {
  cursor: pointer;
  transform: scale(1);
  transition: transform 0.2s ease-in-out;
}

.v-card:hover {
  cursor: pointer;
  transform: scale(1.05);
  transition: transform 0.2s ease-in-out;
}

.card-film {
  position: relative;
  width: 100%;
  height: 100%;
}

.rating {
  position: absolute;
  background-color: green;
  font-weight: 700;
  top: 5%;
  left: 5%;
  border-radius: 5px;
  padding: 3px 6px;
}
</style>
