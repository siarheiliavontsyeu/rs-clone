import type {
  IAward,
  IBoxOffice,
  IDistribution,
  IFact,
  IImage,
  IMovie,
  IMovieSequelsAndPrequelsResponse,
  IRelatedMovie,
  IReviewsResponse,
  ISeason,
  IStaffResponse,
  IVideo,
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

export const useMovieStore = defineStore("movie", {
  state: () => ({
    movie: {} as IMovie,
    seasons: [] as ISeason[],
    boxOffice: [] as IBoxOffice[],
    facts: [] as IFact[],
    distribution: [] as IDistribution[],
    awards: [] as IAward[],
    videos: [] as IVideo[],
    sequelsAndPrequels: [] as IMovieSequelsAndPrequelsResponse[],
    similars: [] as IRelatedMovie[],
    reviewObj: {} as IReviewsResponse,
    images: [] as IImage[],
    staff: [] as IStaffResponse[],
  }),
  getters: {
    // loweredSearchText: (state) => state.searchText.toLocaleLowerCase(),
  },
  actions: {
    async getMovieById(id: number) {
      this.movie = await getMovieById(id);
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
    async getAllInfo(id: number) {
      await this.getStaff(id);
      await this.getSequelsAndPrequels(id);
      await this.getReviews(id);
      await this.getImages(id);
      await this.getSimilars(id);
      await this.getVideos(id);
      await this.getAwards(id);
      await this.getDistribution(id);
      await this.getFacts(id);
      await this.getBoxOffice(id);
      await this.getSeasons(id);
      await this.getMovieById(id);
    },
  },
});
