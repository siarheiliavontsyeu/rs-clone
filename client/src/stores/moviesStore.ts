import { defineStore } from "pinia";
import type {
  IFilterCountryResponse,
  IFilterGenreResponse,
  IMovieFromCollection,
  IMovieSearchByFilters,
  MoviesTopTypesEnum,
} from "@/types/movies.types";
import {
  getAllCountriesAndGenres,
  getMovieFilters,
  getMoviesByCollection,
} from "@/api/movies";

export const useMoviesStore = defineStore("movies", {
  state: () => ({
    movies: [] as IMovieFromCollection[],
    genres: [] as IFilterGenreResponse[],
    countries: [] as IFilterCountryResponse[],
    found: [] as IMovieSearchByFilters[],
  }),
  actions: {
    async getMovies(type: MoviesTopTypesEnum, page: number) {
      this.movies = await getMoviesByCollection(type, page).then(
        (resp) => resp.films
      );
    },
    async getcountriesAndGenres() {
      const { genres, countries } = await getAllCountriesAndGenres();
      this.genres = genres;
      this.countries = countries;
    },
    async getMovieFilters() {
      const data = await getMovieFilters();
      this.found = data.items;
    },
  },
});
