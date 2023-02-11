<template>
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
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/authStore";
import ProfileInfo from "@/components/ProfileInfo.vue";
import ProfileWatchHistory from "@/components/ProfileWatchHistory.vue";
import ProfileWatchLater from "@/components/ProfileWatchLater.vue";

import { useUserDataStore } from "@/stores/userDataStore";
import ProfileEdit from "@/components/ProfileEdit.vue";

const dialog = ref(false);
const authStore = useAuthStore();
const { user, token } = storeToRefs(authStore);

const userDataStore = useUserDataStore();
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
</script>
<style lang=""></style>
