import type { Ref } from "vue";

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum HttpStatusCode {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  Conflict = 409,
  ToManyRequest = 429,
  InternalServerError = 500,
  NotImplemented = 501,
  ServiceUnavailable = 503,
}

export type FetchRequest = () => Promise<void>;

export interface UsableFetch<T> {
  request: FetchRequest;
  response: Ref<T | undefined>;
  error: Ref<Error | undefined>;
  headers: Ref<Headers | undefined>;
}

export type UsableBackend<T> = Promise<{
  response?: Ref<T | undefined>;
  headers: Ref<Headers | undefined>;
  error: Ref<Error | undefined>;
  loading: Ref<boolean>;
}>;

export interface BackendProperties<K> {
  url: string;
  additionalUrl: string;
  body?: K;
  method: HttpMethod;
  token?: string;
}
