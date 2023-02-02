<template>
  <main>Пустая страница</main>
  <div>{{ counter.count }}</div>
  <div>{{ counter.doubleCount }}</div>
  <v-btn @click="counter.increment" color="warning">Увеличить</v-btn>
  <v-btn @click="counter.decrement" color="secondary">Уменшить</v-btn>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore();
</script>
