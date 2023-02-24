<template>
  <main>
    <v-container class="bg-surface">
      <v-row no-gutters>
        <v-list>
          <v-list-item
            @click="$router.push({ name: item.link })"
            v-for="(item, i) in items"
            :key="i"
            :value="item"
            active-color="primary"
            variant="plain"
          >
            <template v-slot:prepend>
              <v-icon
                :icon="item.icon"
                style="margin: 0px 10px 0px 0px"
              ></v-icon>
            </template>
            <v-list-item-title> {{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>

        <div
          class="v-col rounded-lg h-screen w-75 h-100 d-flex flex-column justify-center align-center"
          style="padding: 10px; gap: 20px"
        >
          <card-home class="w-100" :movieProps="movieCard1"></card-home>

          <slide-group
            class="w-100"
            :moviesProps="
              collectionMoviesArr.find((item) => item.name === 'top100')
            "
          >
            Топ 100 >
          </slide-group>

          <slide-group
            class="w-100"
            :moviesProps="
              collectionMoviesArr.find((item) => item.name === 'top250')
            "
          >
            Топ 250 >
          </slide-group>

          <slide-group
            class="w-100"
            :moviesProps="
              collectionMoviesArr.find((item) => item.name === 'topAwait')
            "
          >
            Топ Ожидания >
          </slide-group>

          <calendar-releses
            class="w-100"
            :moviesProps="premiereMovies"
            @updateMonth="this.addNewMonthFilms(true)"
          >
          </calendar-releses>
        </div>
      </v-row>
    </v-container>
  </main>
</template>

<script lang="ts">
import {
  getReleases,
  getMovieImages,
  getMovieById,
  getPremiereMovies,
  getMoviesByCollection,
} from "@/api/index.ts";
import {
  GenreI,
  DigitalReleaseMovieI,
  MovieI,
  ImageResponseI,
  DigitalReleaseResponseI,
  PremiereResponseI,
} from "@/types/movies.types";
import SlideGroup from "@/components/SlideGroup.vue";
import CalendarReleses from "@/components/CalendarReleses.vue";
import CardHome from "@/components/CardHome.vue";
export default {
  components: {
    SlideGroup,
    CalendarReleses,
    CardHome,
  },
  data: () => ({
    items: [
      { text: "Главная", icon: "mdi-home", link: "home" },
      { text: "Онлайн-кинотеатр", icon: "mdi-television", link: "login" },
      { text: "Фильмы", icon: "mdi-filmstrip", link: "login" },
      { text: "Сериалы", icon: "mdi-filmstrip-box-multiple", link: "login" },
      { text: "О команде", icon: "mdi-account-group", link: "about" },
    ],
    month: [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ],
    releasesMovies: {
      isItemsReady: false,
      array: [],
    },
    collectionMovies: {
      isItemsReady: false,
      array: [],
    },
    collectionMoviesArr: [],
    premiereMovies: {
      isItemsReady: false,
      array: [],
    },
    movieCard1: {
      isItemsReady: false,
      body: [],
      images: [],
    },
    date: new Date(),
  }),
  methods: {
    getMovieById(id: number) {
      getMovieById(id).then((res: MovieI) => {
        this.movieCard1.body = res;
        this.movieCard1.body.genresList = this.createGenresList(
          this.movieCard1.body.genres
        );
        this.getMovieImages(id);
      });
    },
    getMovieImages(id: number) {
      getMovieImages(id)
        .then((images: ImageResponseI) => {
          this.movieCard1.images = images.items;
          this.movieCard1.isItemsReady = true;
        })
        .catch((err) => {});
    },
    getReleases(year: number, month: string) {
      getReleases(year, month)
        .then((movies: DigitalReleaseResponseI) => {
          this.releasesMovies.array = this.checkErrorFilm(movies.releases);
          this.releasesMovies.isItemsReady = true;
        })
        .catch((err) => {});
    },
    getPremiereMovies(year: number, month: string) {
      getPremiereMovies(year, month)
        .then((movies: PremiereResponseI) => {
          this.premiereMovies.array = this.checkErrorFilm(movies.items);
          this.premiereMovies.isItemsReady = true;
        })
        .catch((err) => {});
    },
    getMoviesByCollectionArr(type: string, page = 1) {
      const typeRes =
        type === "top250"
          ? "TOP_250_BEST_FILMS"
          : type === "top100"
          ? "TOP_100_POPULAR_FILMS"
          : type === "topAwait"
          ? "TOP_AWAIT_FILMS"
          : "TOP_100_POPULAR_FILMS";
      return getMoviesByCollection(typeRes, page)
        .then((movies: PremiereResponseI) => {
          this.collectionMoviesArr.push({
            isItemsReady: true,
            array: this.checkErrorFilm(movies.films),
            name: type,
          });
        })
        .catch((err) => {});
    },
    addNewMonthFilms(trigger = false) {
      if (trigger) {
        if (this.month[this.date.getMonth() + 1] === undefined) {
          this.getPremiereMovies(this.date.getFullYear() + 1, this.month[0]);
        } else {
          this.getPremiereMovies(
            this.date.getFullYear(),
            this.month[this.date.getMonth() + 1]
          );
        }
      } else {
        this.getPremiereMovies(
          this.date.getFullYear(),
          this.month[this.date.getMonth()]
        );
      }
    },
    createGenresList(filmGenres: GenreI[]) {
      return filmGenres.map((item) => item.genre).join(", ");
    },
    checkErrorFilm(ArrayFilms: DigitalReleaseMovieI[]) {
      return ArrayFilms.filter((item) => item.nameRu.length !== 0);
    },
  },
  mounted() {
    this.addNewMonthFilms();
    this.getMovieById(685246);
    // this.getMovieById(361);
    this.getMoviesByCollectionArr("top100");
    this.getMoviesByCollectionArr("top250");
    this.getMoviesByCollectionArr("topAwait");
  },
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
.card {
  box-shadow: 0px 5px 5px -3px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 8px 10px 1px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0px 3px 14px 2px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
  border-radius: 1rem;
}
.card-body {
  position: relative;
  padding: 0px 0px 30px 30px;
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
</style>
