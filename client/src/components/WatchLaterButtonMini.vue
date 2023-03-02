<template>
  <div
    class="container-btn-save"
    :disabled="isButtonDisabled"
    @click="onWatchLater"
  >
    <v-btn
      class="btn-save"
      icon="mdi-bookmark-plus-outline"
      color="white"
    ></v-btn>
    <!-- <v-btn
                    class="btn-save"
                    icon="mdi-bookmark-check-outline"
                    color="white"
                    v-else-if="movieCard1.saveFilm === 'load'"
                  ></v-btn>
                  <v-btn
                    class="btn-save"
                    icon="mdi-bookmark"
                    color="white"
                    v-else
                  ></v-btn> -->
  </div>
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
  } else {
    return false;
  }
});
const onWatchLater = () => {
  if (!Array.isArray(props.movieId)) {
    movieStore.setWatchLater(props.movieId);
  }
};
</script>
<style lang="css">
.container-btn-save {
  margin-left: 15px;
}
.btn-save {
  background: #2a2a2a;
  transition: all 1s ease-in-out;
}
</style>
