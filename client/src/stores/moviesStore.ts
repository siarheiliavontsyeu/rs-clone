import { defineStore } from "pinia";
import type {
  DigitalReleaseMovieI,
  FilterCountryResponseI,
  FilterGenreResponseI,
  MovieFromCollectionI,
  MovieSearchByFiltersI,
  PremiereMovieI,
  MoviesTopTypesEnum,
} from "@/types/movies.types";
import {
  getAllCountriesAndGenres,
  getMovieFilters,
  getMoviesByCollection,
  getPremiereMovies,
  getReleases,
} from "@/api";

type moviesStoreStateTypes = {
  moviesFromCollection: MovieFromCollectionI[];
  genres: FilterGenreResponseI[];
  countries: FilterCountryResponseI[];
  found: MovieSearchByFiltersI[];
  premiereMovies: PremiereMovieI[];
  releaseSoonMovies: DigitalReleaseMovieI[];
};

export const useMoviesStore = defineStore("movies", {
  state: (): moviesStoreStateTypes => ({
    moviesFromCollection: [],
    genres: [],
    countries: [],
    found: [],
    premiereMovies: [],
    releaseSoonMovies: [],
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
