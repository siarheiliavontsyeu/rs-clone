<template>
  <div class="container-calendar" v-if="movies.isItemsReady">
    <h2>Календарь релизов</h2>
    <v-divider></v-divider>
    <h3>Скоро в кино ></h3>
    <v-list lines="two">
      <div
        class="wrapper-list d-flex flex-column"
        :style="{
          height: `${135 * Math.ceil(this.movies.array.length / 2)}px`,
        }"
      >
        <v-list-item v-for="(movie, i) in movies.array" :key="i">
          <div class="card d-flex flex-row justify-space-between align-center">
            <div class="number">{{ `${i + 1}.` }}</div>
            <div
              class="poster"
              :style="{
                minWidth: '80px',
                height: '100px',
                background: `url(${movie.posterUrlPreview})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
              }"
            ></div>
            <div class="name d-flex flex-column justify-center align-start">
              <div
                class="nameRu"
                @click="
                  $router.push({
                    name: 'movie',
                    params: { movieId: movie.kinopoiskId },
                  })
                "
              >
                {{ movie.nameRu }}
              </div>
              <div class="nameEn">{{ movie.nameEn }}</div>
            </div>
            <div class="date d-flex flex-column justify-center align-center">
              <div class="day">
                {{ Number(movie.premiereRu.split("-")[2]) }}
              </div>
              <div class="month">
                {{ arrDate[Number(movie.premiereRu.split("-")[1]) - 1] }}
              </div>
            </div>
            <div class="container-btn-save">
              <watch-later-button
                v-if="authStore.user"
                :movieId="movie.kinopoiskId"
              ></watch-later-button>
              <watch-later-button
                v-else
                @click="$router.push({ name: 'login' })"
              ></watch-later-button>
            </div>
          </div>
        </v-list-item>
      </div>
    </v-list>
  </div>
</template>

<script lang="ts">
import WatchLaterButton from "@/components/WatchLaterButtonMini.vue";
import { useAuthStore } from "@/stores/authStore";
import { PremiereMovieI } from "@/types/movies.types";
export default {
  components: {
    WatchLaterButton,
  },
  data: () => ({
    arrDate: [
      "январь",
      "февраль",
      "март",
      "апрель",
      "май",
      "июнь",
      "июль",
      "август",
      "сентябрь",
      "октябрь",
      "ноябрь",
      "декабрь",
    ],
    movies: { isItemsReady: false, array: [] },
    date: new Date(),
  }),
  props: {
    moviesProps: {
      type: Object,
      required: true,
    },
  },
  methods: {},
  watch: {
    moviesProps: {
      handler() {
        this.movies.isItemsReady = this.moviesProps.isItemsReady;
        this.movies.array = this.moviesProps.array.filter(
          (item: PremiereMovieI) => {
            const filmDate = Number(item.premiereRu.split("-")[2]);
            const filmMonth = Number(item.premiereRu.split("-")[1]) - 1;
            if (
              (filmDate > this.date.getDate() &&
                filmMonth === this.date.getMonth()) ||
              filmMonth !== this.date.getMonth()
            ) {
              return true;
            } else {
              return false;
            }
          }
        );
        if (this.movies.array.length === 0) {
          this.$emit("updateMonth", true);
        }
      },
      deep: true,
    },
  },
};
</script>
<script setup lang="ts">
const authStore = useAuthStore();
</script>

<style lang="css" scoped>
.container-calendar {
  box-shadow: 0px 5px 5px -3px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 8px 10px 1px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0px 3px 14px 2px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
  border-radius: 1rem;
  overflow: hidden;
}
h2 {
  padding: 20px 10px 0px 20px;
  width: 100%;
}
h3 {
  padding: 10px 10px 10px 25px;
  width: 100%;
}
.v-list {
  height: 940px;
}
.wrapper-list {
  gap: 10px;
  flex-wrap: wrap;
  overflow-x: hidden;
}
.v-list-item {
  max-width: 465px;
}
.card {
  margin: 0px;
  width: 100%;
  height: 100px;
}
.number {
  min-width: 13px;
}
.name {
  width: 40%;
  min-width: 190px;
  margin-left: 10px;
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.nameRu,
.nameEn {
  overflow: hidden;
  max-width: 100%;
  text-decoration: none;
  text-overflow: ellipsis;
  cursor: pointer;
}
.nameRu:hover {
  color: #f60;
}
.nameEn {
  opacity: 0.5;
}
.date {
  margin: 0 5px;
  font-style: italic;
}
.day {
  font-size: 26px;
  font-weight: 800;
  line-height: 18px;
  color: #f60;
}
.container-btn-save {
  margin: 5px;
}
@media (min-width: 1920px) {
  .v-list-item {
    max-width: 765px;
  }
}
@media (max-width: 1279px) {
  .wrapper-list {
    gap: 10px;
    flex-wrap: nowrap;
    overflow-x: visible;
  }
  .v-list-item {
    max-width: 100%;
  }
  .card {
    margin: 0px;
    width: 100%;
    height: 100px;
  }
  .number {
    min-width: 13px;
  }
  .name {
    width: 40%;
    min-width: 350px;
    margin-left: 10px;
    font-size: 20px;
  }
  .nameRu,
  .nameEn {
    overflow: hidden;
    max-width: 100%;
    text-decoration: none;
    text-overflow: ellipsis;
  }
  .date {
    margin: 0 5px;
  }
}
</style>
