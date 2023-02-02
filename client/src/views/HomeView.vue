<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore();
</script>

<template>
  <main>Пустая страница</main>
  <div>{{ counter.count }}</div>
  <div>{{ counter.doubleCount }}</div>
  <button @click="counter.increment">Увеличить</button>
  <button @click="counter.decrement">Уменшить</button>
</template>
