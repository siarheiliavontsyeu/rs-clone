import { defineStore } from "pinia";
import type {
  IDigitalReleaseMovie,
  IFilterCountryResponse,
  IFilterGenreResponse,
  IMovieFromCollection,
  IMovieSearchByFilters,
  IPremiereMovie,
  MoviesTopTypesEnum,
} from "@/types/movies.types";
import {
  getAllCountriesAndGenres,
  getMovieFilters,
  getMoviesByCollection,
  getPremiereMovies,
  getReleases,
} from "@/api";

export const useMoviesStore = defineStore("movies", {
  state: () => ({
    moviesFromCollection: [] as IMovieFromCollection[],
    genres: [] as IFilterGenreResponse[],
    countries: [] as IFilterCountryResponse[],
    found: [] as IMovieSearchByFilters[],
    premiereMovies: [] as IPremiereMovie[],
    releaseSoonMovies: [] as IDigitalReleaseMovie[],
  }),
  actions: {
    async getMovies(type: MoviesTopTypesEnum, page: number) {
      this.moviesFromCollection = await getMoviesByCollection(type, page).then(
        (resp) => resp.films
      );
    },
    async getCountriesAndGenres() {
      const { genres, countries } = await getAllCountriesAndGenres();
      this.genres = genres;
      this.countries = countries;
    },
    async getMovieFilters() {
      const data = await getMovieFilters();
      this.found = data.items;
    },
    async getPremiereMovies(year: number, month: string) {
      const data = await getPremiereMovies(year, month);
      this.premiereMovies = data.items;
    },
    async getReleases(year: number, month: string) {
      const data = await getReleases(year, month);
      this.releaseSoonMovies = data.releases;
    },
  },
});
