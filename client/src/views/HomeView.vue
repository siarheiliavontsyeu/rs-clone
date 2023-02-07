<template>
  <main>
    <h1>Пустая страница</h1>
    <div>
      <ul>
        <li v-for="movie in moviesStore.movies" :key="movie.filmId">
          <RouterLink
            :to="{ name: 'movie', params: { movieId: movie.filmId } }"
            >{{ movie.nameRu }}</RouterLink
          >
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useMoviesStore } from "@/stores/moviesStore";
import { useSearchStore } from "@/stores/search";
import { MoviesTopTypesEnum } from "@/types/movies.types";

const moviesStore = useMoviesStore();
const search = useSearchStore();

// moviesStore.getMovies(MoviesTopTypesEnum.top100, 3);
moviesStore.getMovieFilters();
</script>
