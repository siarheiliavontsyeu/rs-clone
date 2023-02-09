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
}: BackendProperties<K>): UsableBackend<T> {
  const loading = ref<boolean>(true);
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
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
