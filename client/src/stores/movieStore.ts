import type {
  AwardI,
  BoxOfficeI,
  CritiqueModel,
  DistributionI,
  FactI,
  ImageI,
  MovieI,
  MovieModel,
  MovieSequelsAndPrequelsResponseI,
  RelatedMovieI,
  ReviewModel,
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
import { useUserDataStore } from "./userDataStore";
import type { WatchHistoryModel } from "@/types/user.types";
import { useMoviesStore } from "./moviesStore";

export type HighlightedMovie = {
  body: MovieI;
  image: ImageI;
};

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
  currentMovie: WatchHistoryModel | MovieModel | null;
  currentMovieCritique: CritiqueModel[] | null;
  currentMovieReview: ReviewModel | null;
  currentMovieRating: number;
  highlightedMovie: HighlightedMovie;
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
    currentMovie: null,
    currentMovieCritique: [],
    currentMovieReview: {} as ReviewModel,
    currentMovieRating: 0,
    highlightedMovie: {} as HighlightedMovie,
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
    totalReviewsCount: (state) => {
      const kpReviews = state.reviewObj.total || 0;
      const customReview = state.currentMovieCritique?.length || 0;
      return kpReviews + customReview;
    },
    totalPositiveReviewCount: (state) => {
      const kpPositiveReviewCount = state.reviewObj.totalPositiveReviews || 0;
      const customPositiveReviewCount =
        state.currentMovieCritique?.filter((c) => c.type === "positive")
          .length || 0;
      return kpPositiveReviewCount + customPositiveReviewCount;
    },
    negativeReviewCount: (state) => {
      const kpNegativeReviewCount = state.reviewObj.totalNegativeReviews || 0;
      const customNegativeReviewCount =
        state.currentMovieCritique?.filter((c) => c.type === "negative")
          .length || 0;
      return kpNegativeReviewCount + customNegativeReviewCount;
    },
    neutralReviewCount: (state) => {
      const kpNeutralReviewCount = state.reviewObj.totalNeutralReviews || 0;
      const customNeutralReviewCount =
        state.currentMovieCritique?.filter((c) => c.type === "neutral")
          .length || 0;
      return kpNeutralReviewCount + customNeutralReviewCount;
    },
    positiveReviewPercentage: function () {
      const overall =
        Number(this.totalPositiveReviewCount) /
          Number(this.totalReviewsCount) || 0; // ts ругается
      return (overall * 100).toFixed(2);
    },
    negativeReviewPercentage: function () {
      const overall =
        Number(this.negativeReviewCount) / Number(this.totalReviewsCount); // ts ругается
      return (overall * 100).toFixed(2);
    },
    neutralReviewPercentage: function () {
      const overall =
        Number(this.neutralReviewCount) / Number(this.totalReviewsCount); // ts ругается
      return (overall * 100).toFixed(2);
    },
    episodes: (state) => {
      return state.seasons.find(
        (season) => season.number === state.currentSeason
      )?.episodes;
    },
    marketing: (state) => {},
  },
  actions: {
    async getMovieById(id: number) {
      const userDataStore = useUserDataStore();
      const userStore = useAuthStore();
      const movieUrl = BASE_URL + "movie";
      this.movie = await getMovieById(id);
      try {
        const { error, response } = await useBackend<MovieModel, null>({
          url: movieUrl,
          additionalUrl: "/" + id,
        });
        if (error.value) {
          const { response } = await useBackend<MovieModel, MovieModel>({
            url: movieUrl,
            additionalUrl: "",
            method: HttpMethod.POST,
            body: {
              kinopoiskId: String(this.movie.kinopoiskId),
              imdbId: String(this.movie.imdbId),
              nameRu: this.movie.nameRu,
              nameOriginal: this.movie.nameOriginal || this.movie.nameRu,
              posterUrlPreview: this.movie.posterUrlPreview,
              ratingKinopoisk: this.movie.ratingKinopoisk || 7,
              reviews: [],
              critiques: [],
            },
          });
          this.currentMovie = response?.value || null;
        } else {
          this.currentMovie = response?.value || null;
          if (this.currentMovie) {
            this.currentMovieCritique = this.currentMovie.critiques;
            if (userStore.user && userStore.token) {
              this.currentMovieReview =
                this.currentMovie.reviews.find(
                  (r) => r.userId === userStore.user?.id
                ) || null;
              this.currentMovieRating = this.currentMovieReview?.rating || 0;
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
      if (
        userDataStore.watchHistory &&
        !userDataStore.watchHistory
          .map((m) => m.kinopoiskId)
          .includes(String(id))
      ) {
        this.addToWatchHistory(String(id));
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
      const data = await getMovieSequelsAndPrequels(id)
        .then((data) => {
          this.sequelsAndPrequels = data;
        })
        .catch(() => {
          this.sequelsAndPrequels = [];
        });
    },
    async getStaff(id: number) {
      const data = await getMovieStaff(id);
      this.staff = data;
    },
    setCurrentSeason(season: number) {
      this.currentSeason = season;
    },
    setWatchLater(id: string) {
      const userStore = useAuthStore();
      if (userStore.user && userStore.token) {
        useBackend({
          url: BASE_URL + "watch-later",
          additionalUrl: "",
          method: HttpMethod.POST,
          token: userStore.token,
          body: {
            kinopoiskId: id,
            userId: userStore.user.id,
          },
        });
      }
    },
    async addToWatchHistory(id: string) {
      const userStore = useAuthStore();
      if (userStore.user && userStore.token) {
        useBackend({
          url: BASE_URL + "watch-history",
          additionalUrl: "",
          method: HttpMethod.POST,
          token: userStore.token,
          body: {
            kinopoiskId: id,
            userId: userStore.user.id,
          },
        });
      }
    },
    rateMovieByStars(id: number, rating: number) {
      const userStore = useAuthStore();
      if (userStore.user && userStore.token) {
        useBackend({
          url: BASE_URL + "movie/",
          additionalUrl: String(id) + "/review",
          method: HttpMethod.PUT,
          token: userStore.token,
          body: {
            rating,
            userId: userStore.user.id,
            text: "",
          },
        });
      }
    },
    submitReview(id: string, text: string, title: string, type: string) {
      const userStore = useAuthStore();
      if (userStore.user && userStore.token) {
        useBackend({
          url: BASE_URL + "movie/",
          additionalUrl: id + "/critique",
          method: HttpMethod.POST,
          token: userStore.token,
          body: {
            text,
            userId: userStore.user.id,
            title,
            type,
          },
        });
      }
    },

    async getHighlightedMovie() {
      const body = await getMovieById(685246);
      const images = await getMovieImages(685246);
      this.highlightedMovie = { body, image: images.items[0] };
    },

    async getAllInfo(id: number) {
      const searchStore = useSearchStore();
      searchStore.setIsLoading();
      await this.getMovieById(id);
      await this.getStaff(id);
      await this.getBoxOffice(id);
      await this.getDistribution(id);
      await this.getReviews(id);
      if (id < 5000000) {
        await this.getSequelsAndPrequels(id);
      }
      await this.getSimilars(id);
      await this.getFacts(id);
      await this.getAwards(id);
      await this.getImages(id);
      // await this.getVideos(id);
      await this.getSeasons(id);
      searchStore.unsetIsLoading();
      return this.movie.nameRu || this.movie.nameOriginal;
    },
  },
});
