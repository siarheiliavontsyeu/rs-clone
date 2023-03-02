<template>
  <v-card
    class="card w-100"
    v-if="movieStore.highlightedMovie.body"
    @mousemove="someMethod"
  >
    <div
      class="mouse-parallax-bg"
      :style="{
        position: 'absolute',
        background: `url(${movieStore.highlightedMovie.image.imageUrl})`,

        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        width: '110%',
        height: '600px',
      }"
    ></div>
    <div class="wrapper-card"></div>
    <div class="card-body">
      <div class="container-logo d-flex justify-center align-center">
        <div
          @click="
            $router.push({
              name: 'movie',
              params: { movieId: movieStore.highlightedMovie.body.kinopoiskId },
            })
          "
          class="card-logo"
          :style="{
            background: `url(${movieStore.highlightedMovie.body.logoUrl})`,
            backgroundSize: '100%',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            height: '100%',
            width: '50%',
          }"
        ></div>
      </div>
      <v-card-text color="white">{{
        movieStore.highlightedMovie.body.shortDescription
      }}</v-card-text>
      <v-card-text color="white"> <b>Жанры: </b> {{ genres }} </v-card-text>
      <v-card-actions>
        <v-btn
          @click="
            $router.push({
              name: 'movie',
              params: { movieId: movieStore.highlightedMovie.body.kinopoiskId },
            })
          "
          rounded="pill"
          color="white"
          size="large"
          prepend-icon="mdi-information-outline"
          :style="{
            background: 'linear-gradient(135deg, #f50 69.93%, #d6bb00)',
            fontSize: '16px',
            padding: '0px 20px',
            height: '52px',
          }"
        >
          Подробнее
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { useMovieStore } from "@/stores/movieStore";
import { computed } from "vue";

const movieStore = useMovieStore();
const genres = computed(() => {
  return movieStore.highlightedMovie.body.genres
    .map((item) => item.genre)
    .join(", ");
});

const someMethod = (event: { clientX: number; clientY: number }) => {
  let bg = document.querySelector(".mouse-parallax-bg") as HTMLElement;
  let x = event.clientX / window.innerWidth;
  let y = event.clientY / window.innerHeight;
  bg.style.transform = "translate(-" + x * 50 + "px, -" + y * 50 + "px)";
};
</script>

<style lang="css" scoped>
.wrapper-card {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 0;
  background: linear-gradient(
    90deg,
    #000 6.25%,
    #000 6.26%,
    rgba(0, 0, 0, 0.99) 14.15%,
    rgba(0, 0, 0, 0.961) 20.77%,
    rgba(0, 0, 0, 0.915) 26.27%,
    rgba(0, 0, 0, 0.856) 30.8%,
    rgba(0, 0, 0, 0.785) 34.5%,
    rgba(0, 0, 0, 0.705) 37.54%,
    rgba(0, 0, 0, 0.619) 40.06%,
    rgba(0, 0, 0, 0.529) 42.21%,
    rgba(0, 0, 0, 0.437) 44.15%,
    rgba(0, 0, 0, 0.347) 46.03%,
    rgba(0, 0, 0, 0.261) 47.99%,
    rgba(0, 0, 0, 0.18) 50.2%,
    rgba(0, 0, 0, 0.108) 52.79%,
    rgba(0, 0, 0, 0.047) 55.94%,
    transparent 59.77%
  );
  background-size: 150%;
  background-repeat: no-repeat;
}

.container-logo {
  height: 100%;
  width: 100%;
  max-height: 100px;
}
.card {
  height: 500px;
  box-shadow: 0px 5px 5px -3px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 8px 10px 1px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0px 3px 14px 2px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
  border-radius: 1rem;
}

.card-body {
  position: relative;
  padding: 30px 0px 30px 30px;
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  color: white;
  z-index: 10;
}

.card-logo {
  cursor: pointer;
}

.v-card-text {
  font-size: 1.3rem;
  line-height: 100%;
  font-weight: 400;
  overflow: hidden;
  max-width: 100%;
  text-decoration: none;
  text-overflow: ellipsis;
}
</style>
