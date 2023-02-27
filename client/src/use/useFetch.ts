import {
  HttpStatusCode,
  type FetchRequest,
  type UsableFetch,
} from "@/types/fetch.types";
import { ref } from "vue";

function useFetch<T>(url: RequestInfo, options?: RequestInit): UsableFetch<T> {
  const response = ref<T>();
  const error = ref<Error>();
  const headers = ref<Headers>();

  const request: FetchRequest = async () => {
    try {
      const res = await fetch(url, options);
      headers.value = res.headers;
      if (![HttpStatusCode.OK, HttpStatusCode.Created].includes(res.status)) {
        let text = await res.text();
        if (text === "{}") {
          text = res.statusText;
        }
        throw new Error(text);
      }
      response.value = await res.json();
    } catch (err) {
      error.value = err as Error;
    }
  };

  return { response, headers, request, error };
}

export default useFetch;
