import { getStaffPerson } from "@/api";
import type { IStaffPersonSearchResponse } from "@/types/movies.types";
import { defineStore } from "pinia";

export const usePersonStore = defineStore("person", {
  state: () => ({
    person: {} as IStaffPersonSearchResponse,
    personId: 0,
  }),
  getters: {
    // loweredSearchText: (state) => state.searchText.toLocaleLowerCase(),
  },
  actions: {
    async getStaffPerson(id: number) {
      const data = await getStaffPerson(id);
      this.person = data;
    },
    setPersonId(id: number) {
      this.personId = id;
    },
  },
});
