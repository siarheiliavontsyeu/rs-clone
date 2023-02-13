import { getStaffPerson } from "@/api";
import type { StaffPersonSearchResponseI } from "@/types/movies.types";
import { defineStore } from "pinia";
import { useSearchStore } from "./searchStore";
import { properEndingInRu } from "@/helpers/profession";

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
      return state.person.films.filter(
        (movie) => movie.professionKey === state.currentProfession
      );
    },
  },
  actions: {
    async getStaffPerson(id: number) {
      const searchStore = useSearchStore();
      searchStore.setIsLoading();
      const data = await getStaffPerson(id);
      this.person = data;
      searchStore.unsetIsLoading();
      const professionArray = data.films.map((movie) => movie.professionKey);
      this.professionKeys = new Set(professionArray);
      this.currentProfession = [...this.professionKeys][0];
    },
    setCurrentProfession(profession: string) {
      this.currentProfession = profession;
    },
  },
});
// personId: number;
//   webUrl: string;
//   nameRu: string;
//   nameEn: string;
//   sex: GenderTypeEnum;
//   posterUrl: string;
//   growth: string;
//   birthday: string;
//   death: string;
//   age: number;
//   birthplace: string;
//   deathplace: string;
//   hasAwards: number;
//   profession: string;
//   facts: string[];
//   spouses: PersonSpousesI[];
//   films: PersonRelatedMoviesI[];

// filmId: number;
//   nameRu: string;
//   nameEn: string;
//   rating: string;
//   general: boolean;
//   description: string;
//   professionKey: string;
