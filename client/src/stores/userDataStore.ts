import { defineStore } from "pinia";
import { ref, watch } from "vue";
import useBackend from "@/use/useBackend";
import { HttpMethod } from "@/types/fetch.types";
import { BASE_URL } from "@/constants/backend";
import type {
  WatchHistoryModel,
  WatchHistoryPostModel,
} from "@/types/user.types";
import type { MovieModel } from "@/types/movies.types";

export const useUserDataStore = defineStore("userData", () => {
  const watchHistory = ref<WatchHistoryModel[] | null>(null);
  const movies = ref<MovieModel[]>([]);

  const showError = ref(false);
  const showLoading = ref(false);
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
    } else {
      showError.value = true;
    }
    showLoading.value = whLoading.value;
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
      for (const resp of mResponses) {
        if (resp && !resp.error.value && resp.response && resp.response.value) {
          movies.value?.push(resp.response.value);
        }
      }
      console.log(movies.value);
    }
  };

  return { movies, showError, showSuccess, getWatchedHistory };
});
