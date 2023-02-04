<template>
  <main>Пустая страница</main>
  <div>{{ counter.count }}</div>
  <div>{{ counter.doubleCount }}</div>
  <v-btn @click="counter.increment" color="warning">Увеличить</v-btn>
  <v-btn @click="counter.decrement" color="secondary">Уменшить</v-btn>
  <div v-for="movie in movies" :key="movie.id">
    <RouterLink :to="{ name: 'movie', params: { movieId: movie.id } }">{{
      movie.name
    }}</RouterLink>
  </div>
  <div v-for="name in names" :key="name.id">
    <RouterLink :to="{ name: 'name', params: { nameId: name.id } }">{{
      name.name
    }}</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
const counter = useCounterStore();
const movies = [
  { id: 1, name: "Матрица" },
  { id: 2, name: "Матрица 1" },
  { id: 3, name: "Матрица 2" },
  { id: 4, name: "Матрица 3" },
];
const names = [
  { id: 1, name: "Киану Ривз" },
  { id: 2, name: "Актер 1" },
  { id: 3, name: "Актер 2" },
  { id: 4, name: "Актер 3" },
];
</script>
