import { defineStore } from "pinia";
import type {
  DigitalReleaseMovieI,
  FilterCountryResponseI,
  FilterGenreResponseI,
  MovieFromCollectionI,
  MovieSearchByFiltersI,
  PremiereMovieI,
  MoviesTopTypesEnum,
  FilterOptionsI,
  MovieSearchByFiltersResponseI,
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
  foundMovies: MovieSearchByFiltersI[];
  filtersRespone: MovieSearchByFiltersResponseI;
  premiereMovies: PremiereMovieI[];
  releaseSoonMovies: DigitalReleaseMovieI[];
};

export const useMoviesStore = defineStore("movies", {
  state: (): moviesStoreStateTypes => ({
    moviesFromCollection: [],
    genres: [],
    countries: [],
    foundMovies: [],
    premiereMovies: [],
    releaseSoonMovies: [],
    filtersRespone: {} as MovieSearchByFiltersResponseI,
  }),
  getters: {
    sortedCountries: (state) =>
      state.countries
        .filter((c) => c.id !== 54 && c.id !== 235)
        .sort((a, b) => (a.country < b.country ? -1 : 1)),
    sortedGenres: (state) =>
      state.genres.filter((g) => g.id !== 25 && g.id !== 28),
  },
  actions: {
    async getMovies(type: MoviesTopTypesEnum, page = 1) {
      return await getMoviesByCollection(type, page).then((resp) => resp.films);
    },
    async getCountriesAndGenres() {
      const { genres, countries } = await getAllCountriesAndGenres();
      this.genres = genres;
      this.countries = countries;
    },
    async getMovieFilters(options: FilterOptionsI) {
      const data = await getMovieFilters(options);
      this.filtersRespone = data;
      if (options.page > 1) {
        this.foundMovies.push(...data.items);
      } else {
        this.foundMovies = data.items;
      }
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
