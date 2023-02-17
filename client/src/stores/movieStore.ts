import type {
  AwardI,
  BoxOfficeI,
  DistributionI,
  FactI,
  ImageI,
  MovieI,
  MovieSequelsAndPrequelsResponseI,
  RelatedMovieI,
  ReviewsResponseI,
  SeasonI,
  StaffResponseI,
  VideoI,
} from "@/types/movies.types";
import {
  getMovieAwards,
  getMovieBoxOffice,
  getMovieById,
  getMovieDistribution,
  getMovieFacts,
  getMovieImages,
  getMovieReviews,
  getMovieSequelsAndPrequels,
  getMovieSimilars,
  getMovieStaff,
  getMovieVideos,
  getTvShowSeasons,
} from "@/api";
import { defineStore } from "pinia";
import { useSearchStore } from "./searchStore";
import useBackend from "@/use/useBackend";
import { BASE_URL } from "@/constants/backend";
import { HttpMethod } from "@/types/fetch.types";
import { useAuthStore } from "./authStore";

type movieStoreStateTypes = {
  movie: MovieI;
  seasons: SeasonI[];
  boxOffice: BoxOfficeI[];
  facts: FactI[];
  distribution: DistributionI[];
  awards: AwardI[];
  videos: VideoI[];
  sequelsAndPrequels: MovieSequelsAndPrequelsResponseI[];
  similars: RelatedMovieI[];
  reviewObj: ReviewsResponseI;
  images: ImageI[];
  staff: StaffResponseI[];
  currentSeason: number;
};

export const useMovieStore = defineStore("movie", {
  state: (): movieStoreStateTypes => ({
    movie: {} as MovieI,
    seasons: [],
    boxOffice: [],
    facts: [],
    distribution: [],
    awards: [],
    videos: [],
    sequelsAndPrequels: [],
    similars: [],
    reviewObj: {} as ReviewsResponseI,
    images: [],
    staff: [],
    currentSeason: 1,
  }),
  getters: {
    movieMainActors: (state) => {
      return state.staff
        .filter((person) => person.professionKey === "ACTOR")
        .slice(0, 10);
    },
    movieProducers: (state) => {
      return state.staff.filter(
        (person) => person.professionKey === "PRODUCER"
      );
    },
    movieWriter: (state) => {
      return state.staff.filter(
        (person) => person.professionKey === "PRODUCER"
      );
    },
    movieOperator: (state) => {
      return state.staff.filter(
        (person) => person.professionKey === "OPERATOR"
      );
    },
    movieDirector: (state) => {
      return state.staff.filter(
        (person) => person.professionKey === "DIRECTOR"
      );
    },
    movieEditor: (state) => {
      return state.staff.filter((person) => person.professionKey === "EDITOR");
    },
    movieDesigner: (state) => {
      return state.staff.filter((person) => person.professionKey === "DESIGN");
    },
    movieComposer: (state) => {
      return state.staff.filter(
        (person) => person.professionKey === "COMPOSER"
      );
    },
    budgetSpent: (state) => {
      return state.boxOffice.find((b) => b.type === "BUDGET");
    },
    budgetUsa: (state) => {
      return state.boxOffice.find((b) => b.type === "USA");
    },
    budgetWorld: (state) => {
      return state.boxOffice.find((b) => b.type === "WORLD");
    },
    worldPremiere: (state) => {
      return state.distribution.find((d) => (d.type = "WORLD_PREMIER"));
    },
    allPremieres: (state) => {
      return new Set(state.distribution.filter((d) => (d.type = "PREMIERE")));
    },
    allowedAge: (state) => {
      return state.movie.ratingAgeLimits?.replace(/\D/g, "");
    },
    positiveReviewPercentage: (state) => {
      return (
        (state.reviewObj.totalPositiveReviews / state.reviewObj.total) *
        100
      ).toFixed(2);
    },
    negativeReviewPercentage: (state) => {
      return (
        (state.reviewObj.totalNegativeReviews / state.reviewObj.total) *
        100
      ).toFixed(2);
    },
    neutralReviewPercentage: (state) => {
      return (
        (state.reviewObj.totalNeutralReviews / state.reviewObj.total) *
        100
      ).toFixed(2);
    },
    episodes: (state) => {
      return state.seasons.find(
        (season) => season.number === state.currentSeason
      )?.episodes;
    },
    marketing: (state) => {},

    // loweredSearchText: (state) => state.searchText.toLocaleLowerCase(),
  },
  actions: {
    async getMovieById(id: number) {
      const movieUrl = BASE_URL + "movie";
      const { error } = await useBackend({
        url: movieUrl,
        additionalUrl: "/" + id,
      });
      this.movie = await getMovieById(id);
      if (error.value) {
        await useBackend({
          url: movieUrl,
          additionalUrl: "",
          method: HttpMethod.POST,
          body: {
            kinopoiskId: String(this.movie.kinopoiskId),
            imdbId: String(this.movie.imdbId),
            nameRu: this.movie.nameRu,
            nameOriginal: this.movie.nameOriginal,
            posterUrlPreview: this.movie.posterUrlPreview,
            ratingKinopoisk: this.movie.ratingKinopoisk,
            reviews: [],
            critiques: [],
          },
        });
      }
    },
    async getSeasons(id: number) {
      const data = await getTvShowSeasons(id);
      this.seasons = data.items;
    },
    async getBoxOffice(id: number) {
      const data = await getMovieBoxOffice(id);
      this.boxOffice = data.items;
    },
    async getFacts(id: number) {
      const data = await getMovieFacts(id);
      this.facts = data.items;
    },
    async getDistribution(id: number) {
      const data = await getMovieDistribution(id);
      this.distribution = data.items;
    },
    async getAwards(id: number) {
      const data = await getMovieAwards(id);
      this.awards = data.items;
    },
    async getVideos(id: number) {
      const data = await getMovieVideos(id);
      this.videos = data.items;
    },
    async getSimilars(id: number) {
      const data = await getMovieSimilars(id);
      this.similars = data.items;
    },
    async getImages(id: number) {
      const data = await getMovieImages(id);
      this.images = data.items;
    },
    async getReviews(id: number) {
      const data = await getMovieReviews(id);
      this.reviewObj = data;
    },
    async getSequelsAndPrequels(id: number) {
      const data = await getMovieSequelsAndPrequels(id);
      this.sequelsAndPrequels = data;
    },
    async getStaff(id: number) {
      const data = await getMovieStaff(id);
      this.staff = data;
    },
    setCurrentSeason(season: number) {
      this.currentSeason = season;
    },
    setWatchLater(id:string) {
      const userStore = useAuthStore();
      
      if (userStore.user) {
        useBackend({
          url: BASE_URL + "watch-later",
          additionalUrl: "",
          method: HttpMethod.POST,
          body: {
            kinopoiskId: id,
            userId: userStore.user.id,
          },
        });
      }
    },
    async getAllInfo(id: number) {
      const searchStore = useSearchStore();
      searchStore.setIsLoading();
      await this.getMovieById(id);
      // await this.getStaff(id);
      // await this.getBoxOffice(id);
      // await this.getDistribution(id);
      // await this.getReviews(id)
      // await this.getSequelsAndPrequels(id);
      // await this.getSimilars(id);
      // await this.getFacts(id);
      // await this.getAwards(id);
      // await this.getImages(id);
      // // await this.getVideos(id);
      // await this.getSeasons(id);
      searchStore.unsetIsLoading();
    },
  },
});
