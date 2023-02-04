<template>
  <v-app :theme="theme">
    <v-app-bar>
      <h1 class="text-h2 pa-2">Online-cinema</h1>
      <v-spacer></v-spacer>
      <nav>
        <v-btn>
          <RouterLink to="/">Home</RouterLink>
        </v-btn>
        <v-btn>
          <RouterLink to="/about">About</RouterLink>
        </v-btn>
      </nav>
      <v-btn
        :prepend-icon="
          theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
        "
        @click="onClick"
        >Toggle Theme</v-btn
      >
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const theme = ref("light");

function onClick() {
  theme.value = theme.value === "light" ? "dark" : "light";
}
</script>
