import {
  HttpMethod,
  type BackendProperties,
  type UsableBackend,
} from "@/types/fetch.types";
import { ref } from "vue";
import useFetch from "./useFetch";

export default async function useBackend<T, K>({
  url,
  additionalUrl,
  body,
  method = HttpMethod.GET,
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWYyYTQyMDZlODg4MDk5ZmMwYTM5NiIsImxvZ2luIjoiZ3Vlc3QiLCJpYXQiOjE2NzY2MTgzMjN9.r4LLLhpLjuSBc2hjrh1Gsi6T-kZVVDDzVaxzQha_uiU",
}: BackendProperties<K>): UsableBackend<T> {
  const loading = ref<boolean>(true);
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  const { response, headers, request, error } = useFetch<T>(
    url + additionalUrl,
    options
  );
  if (loading.value) {
    await request();
    loading.value = false;
  }
  return { loading, response, headers, error };
}

// kinopoiskId: number;
//   imdbId: string;
//   nameRu: string;
//   nameEn: string;
//   nameOriginal: string;
//   posterUrl: string;
//   posterUrlPreview: string;
//   coverUrl: string;
//   logoUrl: string;
//   reviewsCount: number;
//   ratingGoodReview: number;
//   ratingGoodReviewVoteCount: number;
//   ratingKinopoisk: number;
//   ratingKinopoiskVoteCount: number;
//   ratingImdb: number;
//   ratingImdbVoteCount: number;
//   ratingFilmCritics: number;
//   ratingFilmCriticsVoteCount: number;
//   ratingAwait: number;
//   ratingAwaitCount: number;
//   ratingRfCritics: number;
//   ratingRfCriticsVoteCount: number;
//   webUrl: string;
//   year: number;
//   filmLength: number;
//   slogan: string;
//   description: string;
//   shortDescription: string;
//   editorAnnotation: string;
//   isTicketsAvailable: boolean;
//   productionStatus: MovieProductionStatusEnum;
//   type: MovieTypeEnum;
//   ratingMpaa: string;
//   ratingAgeLimits: string;
//   hasImax: boolean;
//   has3D: boolean;
//   lastSync: string;
//   countries: CountryI[];
//   genres: GenreI[];
//   startYear: number;
//   endYear: number;
//   serial?: boolean;
//   shortFilm?: boolean;
//   completed?: boolean;