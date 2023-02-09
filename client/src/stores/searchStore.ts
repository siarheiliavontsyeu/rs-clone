import { getMovieBySearch, getPersonBySearch } from "@/api";
import type { IMovieSearch, IPersonByName } from "@/types/movies.types";
import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", {
  state: () => ({
    searchText: "",
    moviesList: [] as IMovieSearch[],
    personsList: [] as IPersonByName[],
  }),
  getters: {
    loweredSearchText: (state) => state.searchText.toLocaleLowerCase(),
  },
  actions: {
    getDataBySearch(keyword: string) {
       Promise.all([
        getMovieBySearch(keyword),
        getPersonBySearch(keyword)
      ]).then(res => {
        this.moviesList = res[0].films;
        this.personsList = res[1].items
      });
    },
  },
});
