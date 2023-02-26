<template>
  <v-app :theme="theme">
    <v-app-bar>
      <RouterLink :to="{ name: 'home' }" class="link home">
        <img src="https://fontmeme.com/permalink/230224/338a7214be1736dc22bc6a8d2e51145a.png" alt="calligraphy-fonts"
          border="0" v-if="theme === 'light'">
        <img src="https://fontmeme.com/permalink/230224/9105c74b8b143f58b5913956d37c3072.png" alt="calligraphy-fonts"
          border="0" v-else>
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
      <!-- <v-parallax src="https://yastatic.net/s3/passport-auth-customs/customs/_/4vui26y6.jpg"> -->
      <router-view></router-view>
      <!-- </v-parallax> -->
    </v-main>
    <ScrollToTop />
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import SearchField from "@/components/SearchField.vue";
import ProfileBar from "@/components/ProfileBar.vue";
import { useUserDataStore } from "@/stores/userDataStore";
import ScrollToTop from "@/components/ScrollToTop.vue";
import { useAuthStore } from "@/stores/authStore";

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
  background-attachment: fixed;
  background-size: cover;
  background-image: url(https://yastatic.net/s3/passport-auth-customs/customs/_/4vui26y6.jpg);
}

.filters:hover {
  color: #f50;
  transition: all 0.3s;
  transform: scale(1.25);
}

.home {
  padding-left: 10px;
}

@media (max-width:1200px) {
  .home img {
    width: 400px;
  }
}
</style>
