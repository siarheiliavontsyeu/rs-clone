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
