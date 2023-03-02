<template>
  <v-btn
    prepend-icon="mdi-eye"
    size="large"
    variant="outlined"
    color="#f50"
    :disabled="isDisabled"
    @click="onWatchLater"
    >Буду смотреть</v-btn
  >
</template>
<script setup lang="ts">
import { useMovieStore } from "@/stores/movieStore";
import { useUserDataStore } from "@/stores/userDataStore";
import { ref } from "vue";

const props = defineProps<{ movieId: string }>();
const movieStore = useMovieStore();
const userDataStore = useUserDataStore();
const isDisabled = ref(
  userDataStore.watchLater.map((m) => m.kinopoiskId).includes(props.movieId)
);

const onWatchLater = () => {
  if (!Array.isArray(props.movieId)) {
    movieStore.setWatchLater(props.movieId);
    isDisabled.value = true;
  }
};
</script>
<style lang=""></style>
