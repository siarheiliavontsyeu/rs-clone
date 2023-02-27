import { getStaffPerson } from "@/api";
import type { StaffPersonSearchResponseI } from "@/types/movies.types";
import { defineStore } from "pinia";
import { useSearchStore } from "./searchStore";
import { properEndingInRu } from "@/helpers/composables";

type personStoreStateType = {
  person: StaffPersonSearchResponseI;
  professionKeys: Set<string>;
  currentProfession: string;
};
export const usePersonStore = defineStore("person", {
  state: (): personStoreStateType => ({
    person: {} as StaffPersonSearchResponseI,
    professionKeys: {} as Set<string>,
    currentProfession: "",
  }),
  getters: {
    moviesByProfessionCount: (state) => {
      return (profession: string) => {
        const moviesCount = state.person.films.filter(
          (movie) => movie.professionKey === profession
        ).length;
        return moviesCount + ` ${properEndingInRu(moviesCount)}`;
      };
    },
    moviesByProfession: (state) => {
      return state.person.films
        .filter((movie) => movie.professionKey === state.currentProfession)
        .sort((a, b) => Number(b.rating) - Number(a.rating));
    },
  },
  actions: {
    async getStaffPerson(id: number, keyIndex: number) {
      const searchStore = useSearchStore();
      searchStore.setIsLoading();
      const data = await getStaffPerson(id, keyIndex);
      this.person = data;
      searchStore.unsetIsLoading();
      const professionArray = data.films.map((movie) => movie.professionKey);
      this.professionKeys = new Set(professionArray);
      this.currentProfession = [...this.professionKeys][0];

      return this.person.nameRu || this.person.nameEn;
    },
    setCurrentProfession(profession: string) {
      this.currentProfession = profession;
    },
  },
});
