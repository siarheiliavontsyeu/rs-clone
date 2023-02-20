import { defineStore } from "pinia";
import { ref, watch } from "vue";
import useBackend from "@/use/useBackend";
import { HttpMethod } from "@/types/fetch.types";
import { BASE_URL } from "@/constants/backend";
import type { WatchHistoryModel, WatchLaterModel } from "@/types/user.types";
import type { MovieModel } from "@/types/movies.types";

export const useUserDataStore = defineStore("userData", () => {
  const watchHistory = ref<WatchHistoryModel[]>([]);
  const moviesHistory = ref<MovieModel[]>([]);
  const watchLater = ref<WatchLaterModel[]>([]);
  const moviesLater = ref<MovieModel[]>([]);
  const critiqueMovies = ref<MovieModel[]>([]);

  const showError = ref(false);
  const showLoading = ref(true);
  const showSuccess = ref(false);

  watch(
    () => showError,
    () => {
      setTimeout(() => {
        showError.value = false;
      }, 3000);
    }
  );

  watch(
    () => showSuccess,
    () => {
      setTimeout(() => {
        showSuccess.value = false;
      }, 3000);
    }
  );

  const getWatchedHistory = async (userId: string, token: string) => {
    const {
      loading: whLoading,
      response: whResponse,
      error: whError,
    } = await useBackend<WatchHistoryModel[], null>({
      url: BASE_URL + "watch-history",
      method: HttpMethod.GET,
      additionalUrl: "/" + userId,
      token,
    });
    if (!whError.value) {
      showError.value = false;
      if (whResponse && whResponse.value) {
        watchHistory.value = whResponse.value;
      }
    } else {
      showError.value = true;
    }
    showLoading.value = whLoading.value;
  };

  const getWatchedLater = async (userId: string, token: string) => {
    const {
      loading: whLoading,
      response: whResponse,
      error: whError,
    } = await useBackend<WatchLaterModel[], null>({
      url: BASE_URL + "watch-later",
      method: HttpMethod.GET,
      additionalUrl: "/" + userId,
      token,
    });
    if (!whError.value) {
      showError.value = false;
      if (whResponse && whResponse.value) {
        watchLater.value = whResponse.value;
      }
    } else {
      showError.value = true;
    }
    showLoading.value = whLoading.value;
  };

  const getMyCritiques = async (userId: string, token: string) => {
    const {
      loading: whLoading,
      response: whResponse,
      error: whError,
    } = await useBackend<MovieModel[], null>({
      url: BASE_URL + "users",
      method: HttpMethod.GET,
      additionalUrl: "/" + userId + "/user-critiques",
      token,
    });
    if (!whError.value) {
      showError.value = false;
      if (whResponse && whResponse.value) {
        critiqueMovies.value = whResponse.value;
      }
    } else {
      showError.value = true;
    }
    if (whResponse && whResponse.value) {
      const requests = whResponse.value.map((r) => {
        return useBackend<MovieModel, null>({
          url: BASE_URL + "movie",
          method: HttpMethod.GET,
          additionalUrl: "/" + r.kinopoiskId,
          token,
        });
      });
      const mResponses = await Promise.all(requests);
      moviesLater.value.length = 0;
      for (const resp of mResponses) {
        if (resp && !resp.error.value && resp.response && resp.response.value) {
          moviesLater.value?.push(resp.response.value);
        }
      }
    }
    showLoading.value = whLoading.value;
  };

  return {
    moviesHistory,
    watchHistory,
    moviesLater,
    critiqueMovies,
    showError,
    watchLater,
    showSuccess,
    showLoading,
    getWatchedHistory,
    getWatchedLater,
    getMyCritiques,
  };
});
