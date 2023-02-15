<template>
  <MyLoader v-if="showLoading" />
  <template v-else>
    <ScrollToTop></ScrollToTop>
    <iframe
      is="x-frame-bypass"
      src="https://widgets.kinopoisk.ru/discovery/trailer/167560?onlyPlayer=1&autoplay=1&cover=1"
      width="500"
      height="500"
    ></iframe>
    <ProfileInfo
      v-if="user"
      :user="user"
      @open-dialog="dialog = true"
    ></ProfileInfo>
    <v-divider></v-divider>
    <ProfileWatchHistory
      :movies="moviesHistoryWithWatchedDate"
    ></ProfileWatchHistory>
    <v-divider></v-divider>
    <ProfileWatchLater :movies="moviesLater"></ProfileWatchLater>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-dialog v-model="dialog" max-width="500">
      <ProfileEdit @close-dialog="dialog = false"></ProfileEdit>
    </v-dialog>
  </template>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import ProfileInfo from "@/components/ProfileInfo.vue";
import ProfileWatchHistory from "@/components/ProfileWatchHistory.vue";
import ProfileWatchLater from "@/components/ProfileWatchLater.vue";
import ScrollToTop from "@/components/ScrollToTop.vue";

import { useUserDataStore } from "@/stores/userDataStore";
import ProfileEdit from "@/components/ProfileEdit.vue";
import MyLoader from "@/components/MyLoader.vue";

const dialog = ref(false);
const authStore = useAuthStore();
const { user, token } = storeToRefs(authStore);

const userDataStore = useUserDataStore();
const { showLoading } = storeToRefs(userDataStore);
const { getWatchedHistory, getWatchedLater } = userDataStore;
const { moviesHistory, watchHistory, moviesLater } = storeToRefs(userDataStore);
const moviesHistoryWithWatchedDate = computed(() => {
  return moviesHistory.value.map((movie) => {
    const watched = watchHistory.value.find(
      (history) => history.kinopoiskId === movie.kinopoiskId
    );
    if (watched) {
      return { ...movie, watchedAt: watched.watchedAt };
    }
    return movie;
  });
});

if (user.value && token.value) {
  getWatchedHistory(user.value.id, token.value);
  getWatchedLater(user.value.id, token.value);
}

onMounted(() => {
  const script1 = document.createElement("script");
  script1.src = "https://unpkg.com/@ungap/custom-elements-builtin";
  document.body.appendChild(script1);

  const script2 = document.createElement("script");
  script2.type = "module";
  script2.src = "https://unpkg.com/x-frame-bypass";
  document.body.appendChild(script2);
});
</script>
<style lang=""></style>
