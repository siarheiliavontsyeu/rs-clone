<template>
  <main>Пустая страница</main>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { useSearchStore } from "@/stores/search";

const counter = useCounterStore();
const search = useSearchStore();
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
