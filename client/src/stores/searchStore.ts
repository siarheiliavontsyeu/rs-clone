import { getMovieBySearch, getPersonBySearch } from "@/api";
import type { IMovieSearch, IPersonByName } from "@/types/movies.types";
import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", {
  state: () => ({
    searchText: "",
    isLoading: false,
    moviesList: [] as IMovieSearch[],
    personsList: [] as IPersonByName[],
  }),
  getters: {
    loweredSearchText: (state) => state.searchText.toLocaleLowerCase(),
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
    setIsLoading(){
      this.isLoading = true;
    },
    unsetIsLoading(){
      this.isLoading = false;
    }
  },
});
