import type { MovieModel } from "./movies.types";

export interface UserModel {
  id: string;
  name: string;
  login: string;
  subscription: string;
}

export interface UserRegistrationModel {
  name: string;
  login: string;
  password: string;
}

export interface WatchHistoryModel {
  userId: string;
  kinopoiskId: string;
  watchedAt: string;
  movie: Omit<MovieModel, "watchedAt">;
}

export type WatchHistoryPostModel = Omit<WatchHistoryModel, "watchedAt">;

export interface WatchLaterModel {
  userId: string;
  kinopoiskId: string;
  movie: Omit<MovieModel, "watchedAt">;
}
