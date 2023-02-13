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
