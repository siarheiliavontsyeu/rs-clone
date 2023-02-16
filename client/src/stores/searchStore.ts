import { getMovieBySearch, getPersonBySearch } from "@/api";
import type { MovieSearchI, PersonByNameI } from "@/types/movies.types";
import { defineStore } from "pinia";

type searchStoreStateTypes = {
  isLoading: boolean;
  moviesList: MovieSearchI[];
  personsList: PersonByNameI[];
};

export const useSearchStore = defineStore("search", {
  state: (): searchStoreStateTypes => ({
    isLoading: false,
    moviesList: [],
    personsList: [],
  }),
  getters: {
    movies: (state) => {
      return state.moviesList.map((movie) => ({
        id: movie.filmId,
        nameRu: movie.nameRu,
        nameEn: movie.nameEn,
        img: movie.posterUrl,
        isMovie: true,
      }));
    },
    persons: (state) => {
      return state.personsList.map((person) => ({
        id: person.kinopoiskId,
        nameRu: person.nameRu,
        nameEn: person.nameEn,
        img: person.posterUrl,
        isMovie: false,
      }));
    },
  },
  actions: {
    async getDataBySearch(keyword: string) {
      getMovieBySearch(keyword).then((response) => {
        this.moviesList = response.films;
      });
      getPersonBySearch(keyword).then((response) => {
        this.personsList = response.items;
      });
    },
    setIsLoading() {
      this.isLoading = true;
    },
    unsetIsLoading() {
      this.isLoading = false;
    },
  },
});
