<template>
  <v-app :theme="theme">
    <v-app-bar>
      <h1 class="text-h2 pa-2 cup" @click="$router.push({ name: 'home' })">Online-cinema</h1>
      <v-spacer></v-spacer>
      <SearchField></SearchField>
      <v-spacer></v-spacer>
      <v-btn icon @click="onClick">
        <v-icon>{{
          theme === "light" ? "mdi-weather-sunny" : "mdi-weather-night"
        }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import SearchField from "./components/SearchField.vue";

const theme = ref("light");

function onClick() {
  theme.value = theme.value === "light" ? "dark" : "light";
}
</script>

<style>
  .cup{
    cursor: pointer;
  }
</style>
