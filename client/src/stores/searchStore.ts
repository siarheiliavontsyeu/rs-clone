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
    async getDataBySearch(keyword: string) {
      const movie = await getMovieBySearch(keyword);
      const person = await getPersonBySearch(keyword);
      this.moviesList = movie.films;
      this.personsList = person.items;
    },
  },
});
