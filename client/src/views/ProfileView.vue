<template>
  <MyLoader v-if="showLoading" />
  <template v-else>
    <div class="container">
      <ProfileInfo
        v-if="user"
        :user="user"
        @open-dialog="dialog = true"
      ></ProfileInfo>
      <v-divider
        class="divider-opacity"
        color="orange"
        thickness="2"
      ></v-divider>
      <ProfileWatchHistory :history="watchHistory"></ProfileWatchHistory>
      <v-divider
        class="divider-opacity"
        color="orange"
        thickness="2"
      ></v-divider>
      <ProfileWatchLater :later="watchLater"></ProfileWatchLater>
      <v-divider
        class="divider-opacity"
        color="orange"
        thickness="2"
      ></v-divider>
      <ProfileCritiques :movies="critiqueMovies"></ProfileCritiques>
      <v-divider
        class="divider-opacity"
        color="orange"
        thickness="2"
      ></v-divider>
      <v-dialog v-model="dialog" max-width="500">
        <ProfileEdit @close-dialog="dialog = false"></ProfileEdit>
      </v-dialog>
    </div>
  </template>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
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
const { watchHistory, watchLater, critiqueMovies } = storeToRefs(userDataStore);

if (user.value && token.value) {
  getWatchedHistory(user.value.id, token.value);
  getWatchedLater(user.value.id, token.value);
  getMyCritiques(user.value.id, token.value);
}
</script>
<style scoped>
.divider-opacity {
  opacity: 1;
}
.container {
  background-color: rgb(var(--v-theme-background));
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
