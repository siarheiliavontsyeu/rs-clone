import { getStaffPerson } from "@/api";
import type { IStaffPersonSearchResponse } from "@/types/movies.types";
import { defineStore } from "pinia";
import { useSearchStore } from "./searchStore";

export const usePersonStore = defineStore("person", {
  state: () => ({
    person: {} as IStaffPersonSearchResponse,
  }),
  getters: {
    // loweredSearchText: (state) => state.searchText.toLocaleLowerCase(),
  },
  actions: {
    async getStaffPerson(id: number) {
      const searchStore = useSearchStore();
      searchStore.setIsLoading();
      const data = await getStaffPerson(id);      
      this.person = data;
      searchStore.unsetIsLoading();
    },
  },
});
