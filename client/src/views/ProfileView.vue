<template>
  <MyLoader v-if="showLoading" />
  <template v-else>
    <ProfileInfo
      v-if="user"
      :user="user"
      @open-dialog="dialog = true"
    ></ProfileInfo>
    <v-divider color="orange" thickness="4"></v-divider>
    <ProfileWatchHistory
      :movies="moviesHistoryWithWatchedDate"
    ></ProfileWatchHistory>
    <v-divider color="orange" thickness="4"></v-divider>
    <ProfileWatchLater :movies="moviesLater"></ProfileWatchLater>
    <v-divider color="orange" thickness="4"></v-divider>
    <ProfileCritiques :movies="critiqueMovies"></ProfileCritiques>
    <v-divider color="orange" thickness="4"></v-divider>
    <v-dialog v-model="dialog" max-width="500">
      <ProfileEdit @close-dialog="dialog = false"></ProfileEdit>
    </v-dialog>
  </template>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/authStore";
import ProfileInfo from "@/components/ProfileInfo.vue";
import ProfileWatchHistory from "@/components/ProfileWatchHistory.vue";
import ProfileWatchLater from "@/components/ProfileWatchLater.vue";
import ProfileCritiques from "@/components/ProfileCritiques.vue";

import { useUserDataStore } from "@/stores/userDataStore";
import ProfileEdit from "@/components/ProfileEdit.vue";
import MyLoader from "@/components/MyLoader.vue";

const dialog = ref(false);
const authStore = useAuthStore();
const { user, token } = storeToRefs(authStore);

const userDataStore = useUserDataStore();
const { showLoading } = storeToRefs(userDataStore);
const { getWatchedHistory, getWatchedLater, getMyCritiques } = userDataStore;
const { moviesHistory, watchHistory, moviesLater, critiqueMovies } =
  storeToRefs(userDataStore);
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
  getMyCritiques(user.value.id, token.value);
}
</script>
<style lang="" scoped></style>
