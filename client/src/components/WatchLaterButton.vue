<template>
  <v-btn
    prepend-icon="mdi-eye"
    size="large"
    variant="outlined"
    color="#f50"
    :disabled="isButtonDisabled"
    @click="onWatchLater"
    >Буду смотреть</v-btn
  >
</template>
<script setup lang="ts">
import { useMovieStore } from "@/stores/movieStore";
import { useUserDataStore } from "@/stores/userDataStore";
import { computed } from "vue";

const props = defineProps<{ movieId: string | string[] }>();
const movieStore = useMovieStore();
const userDataStore = useUserDataStore();

const isButtonDisabled = computed(() => {
  if (!Array.isArray(props.movieId)) {
    return userDataStore.watchLater
      .map((m) => m.kinopoiskId)
      .includes(props.movieId);
  } else return false;
});
const onWatchLater = () => {
  if (!Array.isArray(props.movieId)) {
    movieStore.setWatchLater(props.movieId);
  }
};
</script>
<style lang=""></style>
