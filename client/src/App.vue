<template>
  <v-app :theme="theme">
    <v-app-bar>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <nav>
        <v-btn>
          <RouterLink to="/">Home</RouterLink>
        </v-btn>
        <v-btn>
          <RouterLink to="/about">About</RouterLink>
        </v-btn>
      </nav>
      <v-btn :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" @click="onClick">Toggle
        Theme</v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-bottom-navigation>
      <v-btn value="recent">
        <v-icon>mdi-history</v-icon>

        Recent
      </v-btn>

      <v-btn value="favorites">
        <v-icon>mdi-heart</v-icon>

        Favorites
      </v-btn>

      <v-btn value="nearby">
        <v-icon>mdi-map-marker</v-icon>

        Nearby
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const theme = ref('light');

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>
