<template>
  <v-app :theme="theme">
    <v-app-bar>
      <RouterLink :to="{ name: 'home' }" class="link home">
        <img
          src="https://fontmeme.com/permalink/230222/90dd6a080269539390d20737f37a639d.png"
          alt="calligraphy-fonts"
          border="0"
        />
      </RouterLink>
      <v-spacer></v-spacer>
      <SearchField></SearchField>
      <RouterLink :to="{ name: 'filters' }" class="link filters">
        <v-icon>mdi-filter</v-icon>
      </RouterLink>
      <v-spacer></v-spacer>
      <v-btn icon @click="onClick">
        <v-icon>{{
          theme === "light" ? "mdi-weather-sunny" : "mdi-weather-night"
        }}</v-icon>
      </v-btn>
      <ProfileBar></ProfileBar>
    </v-app-bar>
    <v-main class="main">
      <router-view></router-view>
    </v-main>
    <ScrollToTop />
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import SearchField from "@/components/SearchField.vue";
import ProfileBar from "@/components/ProfileBar.vue";
import { useMoviesStore } from "@/stores/moviesStore";
import { useUserDataStore } from "@/stores/userDataStore";
import ScrollToTop from "@/components/ScrollToTop.vue";
import { useAuthStore } from "@/stores/authStore";

const moviesStore = useMoviesStore();
const userDataStore = useUserDataStore();
const authStore = useAuthStore();

const theme = ref("light");
if (authStore.user && authStore.token) {
  userDataStore.getWatchedHistory(authStore.user.id, authStore.token);
  userDataStore.getWatchedLater(authStore.user.id, authStore.token);
}
function onClick() {
  theme.value = theme.value === "light" ? "dark" : "light";
}
moviesStore.getCountriesAndGenres();
</script>

<style>
.cup {
  cursor: pointer;
}

.link {
  text-decoration: none;
  color: var(--color-text);
}

.tac {
  text-align: center;
}

.red {
  color: red;
}

.gray {
  color: #777;
}

.green {
  color: #3bb33b;
}

.main {
  background-color: rgb(var(--v-theme-on-surface-variant));
}

.filters:hover {
  color: #f50;
  transition: all 0.3s;
  transform: scale(1.25);
}

.home {
  padding-left: 10px;
}
</style>
