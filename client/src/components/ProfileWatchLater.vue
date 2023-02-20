<template>
  <v-container fluid>
    <v-row align="center">
      <v-col>
        <h2>Посмотреть позже</h2>
      </v-col>
    </v-row>
    <v-row> </v-row>
  </v-container>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="(lat, index) in later"
        :key="index"
        cols="12"
        sm="6"
        md="3"
        lg="2"
      >
        <MovieCard :movie="lat.movie"></MovieCard>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import MovieCard from "@/components/MovieCard.vue";
import type { WatchLaterModel } from "@/types/user.types";

const props = defineProps<{
  later: WatchLaterModel[];
}>();
</script>
<style scoped></style>
