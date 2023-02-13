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
      const searchStore = useSearchStore();
      searchStore.setIsLoading();
      // await this.getStaff(id);
      // await this.getSequelsAndPrequels(id);
      // await this.getReviews(id);
      // await this.getImages(id);
      // await this.getSimilars(id);
      // await this.getVideos(id);
      // await this.getAwards(id);
      // await this.getDistribution(id);
      // await this.getFacts(id);
      // await this.getBoxOffice(id);
      // await this.getSeasons(id);
      await this.getMovieById(id);
      searchStore.unsetIsLoading();
    },
  },
});
