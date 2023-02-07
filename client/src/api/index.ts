import type {
  IAwardResponse,
  IBoxOfficeResponse,
  ICountriesAndGenresResponse,
  IDigitalReleaseResponse,
  IDistributionResponse,
  IFactResponse,
  IImageResponse,
  IMovie,
  IMoviesCollectionResponse,
  IMovieSearchByFiltersResponse,
  IMovieSearchResponse,
  IMovieSequelsAndPrequelsResponse,
  IPersonByNameResponse,
  IPremiereResponse,
  IRelatedMovieResponse,
  IReviewsResponse,
  ISeasonResponse,
  IStaffPersonSearchResponse,
  IStaffResponse,
  IVideoResponse,
  MoviesTopTypesEnum,
} from "@/types/movies.types";

const base = "https://kinopoiskapiunofficial.tech/api/";

const movies = `${base}v2.2/films`;
const moviesV2 = `${base}v2.1/films`;
const staff = `${base}v1/staff`;
const person = `${base}v1/persons`;

// const apiKey = "a416cbec-8426-43cd-a937-a71a92590c5a";
// const apiKey = "8c127e8c-2803-48a5-873f-896a5bd57f56";
const apiKey = "ea4d9c93-4b9c-46d5-890f-80a449dc95b4";

// шаблон запрос с ключом
const requestTemplate = async (
  baseUrl: string,
  options?: { [key: string]: string }
) => {
  return await fetch(baseUrl, {
    ...options,
    headers: {
      "X-API-KEY": apiKey,
    },
  });
};

// get запрос для фильмов по типу коллекции и страницы
export const getMoviesByCollection = async (
  type: MoviesTopTypesEnum,
  page: number
): Promise<IMoviesCollectionResponse> => {
  const resp = await requestTemplate(`${movies}/top?type=${type}&page=${page}`);
  return resp.json();
};

// get запрос для всех стран и жанров
export const getAllCountriesAndGenres =
  async (): Promise<ICountriesAndGenresResponse> => {
    const resp = await requestTemplate(`${movies}/filters`);
    return resp.json();
  };
// get запрос для фильма по айди
export const getMovieById = async (id: number): Promise<IMovie> => {
  const resp = await requestTemplate(`${movies}/${id}`);
  return resp.json();
};

//get запрос для сезонов сериала
export const getTvShowSeasons = async (
  id: number
): Promise<ISeasonResponse> => {
  const resp = await requestTemplate(`${movies}/${id}/seasons`);
  return resp.json();
};

// get запрос для фактов фильма/сериала
export const getMovieFacts = async (id: number): Promise<IFactResponse> => {
  const resp = await requestTemplate(`${movies}/${id}/facts`);
  return resp.json();
};

//get запрос для данных о прокате фильма
export const getMovieDistribution = async (
  id: number
): Promise<IDistributionResponse> => {
  const resp = await requestTemplate(`${movies}/${id}/distributions`);
  return resp.json();
};

// get запрос для данных о бюджете и сборах фильма
export const getMovieBoxOffice = async (
  id: number
): Promise<IBoxOfficeResponse> => {
  const resp = await requestTemplate(`${movies}/${id}/box_office`);
  return resp.json();
};

//get запрос для наград фильма
export const getMovieAwards = async (id: number): Promise<IAwardResponse> => {
  const resp = await requestTemplate(`${movies}/${id}/awards`);
  return resp.json();
};

//get запрос для видео по фильму
export const getMovieVideos = async (id: number): Promise<IVideoResponse> => {
  const resp = await requestTemplate(`${movies}/${id}/videos`);
  return resp.json();
};

//get запрос для похожих о фильмов
export const getMovieSimilars = async (
  id: number
): Promise<IRelatedMovieResponse> => {
  const resp = await requestTemplate(`${movies}/${id}/similars`);
  return resp.json();
};

//get запрос для изображений по фильму
export const getMovieImages = async (id: number): Promise<IImageResponse> => {
  const resp = await requestTemplate(`${movies}/${id}/images`);
  return resp.json();
};

//get запрос для отзывов о фильме
export const getMovieReviews = async (
  id: number
): Promise<IReviewsResponse> => {
  const resp = await requestTemplate(`${movies}/${id}/reviews`);
  return resp.json();
};

// get запрос для кинопремьер
export const getPremiereMovies = async (
  year: number,
  month: string
): Promise<IPremiereResponse> => {
  const resp = await requestTemplate(
    `${movies}/premieres?year=${year}&month=${month}`
  );
  return resp.json();
};

//get запрос для сиквелов и приквелов фильма
export const getMovieSequelsAndPrequels = async (
  id: number
): Promise<IMovieSequelsAndPrequelsResponse[]> => {
  const resp = await requestTemplate(`${moviesV2}/${id}/sequels_and_prequels`);
  return resp.json();
};

//get запрос для поиска фильма по ключевому слову
export const getMovieBySearch = async (
  keyword: string,
  page: number = 1
): Promise<IMovieSearchResponse> => {
  const resp = await requestTemplate(
    `${moviesV2}/search-by-keyword?keyword=${keyword}&page=${page}`
  );
  return resp.json();
};

//get запрос для списка цифровых релизов
export const getReleases = async (
  year: number,
  month: string,
  page: number = 1
): Promise<IDigitalReleaseResponse> => {
  const resp = await requestTemplate(
    `${moviesV2}/releases?year=${year}&month=${month}&page=${page}`
  );
  return resp.json();
};

//get запрос о команде фильма
export const getMovieStaff = async (id: number): Promise<IStaffResponse[]> => {
  const resp = await requestTemplate(`${staff}?filmId=${id}`);
  return resp.json();
};

// get запрос о конкретном человеке
export const getStaffPerson = async (
  id: number
): Promise<IStaffPersonSearchResponse> => {
  const resp = await requestTemplate(`${staff}/${id}`);
  return resp.json();
};

//get запрос для поиска персоны
export const getPersonBySearch = async (
  name: string,
  page = 1
): Promise<IPersonByNameResponse> => {
  const resp = await requestTemplate(`${person}?name=${name}&page=${page}`);
  return resp.json();
};

export const getMovieFilters = async (
  country?: number,
  genre?: number,
  order = "RATING",
  type = "ALL",
  ratingFrom = 0,
  ratingTo = 10,
  yearFrom = 1000,
  yearTo = 3000,
  imdbId?: string,
  keyword?: string,
  page = 1
): Promise<IMovieSearchByFiltersResponse> => {
  const resp = await requestTemplate(
    `${movies}?
    countries=${country}&
    genres=${genre}&
    order=${order}&
    type=${type}&
    ratingFrom=${ratingFrom}&
    ratingTo=${ratingTo}&
    yearFrom=${yearFrom}&
    yearTo=${yearTo}&
    imdbId=${imdbId}&
    keyword=${keyword}&
    page=${page}`
  );
  return resp.json();
};
