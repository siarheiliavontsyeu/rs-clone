import type {
  AwardResponseI,
  BoxOfficeResponseI,
  CountriesAndGenresResponseI,
  DigitalReleaseResponseI,
  DistributionResponseI,
  FactResponseI,
  ImageResponseI,
  MovieI,
  MoviesCollectionResponseI,
  MovieSearchByFiltersResponseI,
  MovieSearchResponseI,
  MovieSequelsAndPrequelsResponseI,
  PersonByNameResponseI,
  PremiereResponseI,
  RelatedMovieResponseI,
  ReviewsResponseI,
  SeasonResponseI,
  StaffPersonSearchResponseI,
  StaffResponseI,
  VideoResponseI,
  MoviesTopTypesEnum,
  FilterOptionsI,
} from "@/types/movies.types";
import axios from "axios";

const base = "https://kinopoiskapiunofficial.tech/api/";

const movies = `${base}v2.2/films`;
const moviesV2 = `${base}v2.1/films`;
const staff = `${base}v1/staff`;
const person = `${base}v1/persons`;

const apiKeys = [
  "8c127e8c-2803-48a5-873f-896a5bd57f56",
  "ea4d9c93-4b9c-46d5-890f-80a449dc95b4",
  "25da1c71-fc83-404f-81b0-aa2ceb00fea6",
  "a416cbec-8426-43cd-a937-a71a92590c5a",
  "90454946-1709-4935-acfb-ca0db16e10ef",
  "7613210d-0dfd-4735-8627-f8f0bdc796bd",
  "9b171c47-e651-48e8-b2f1-d202a49127e4",
];
// шаблон запрос с ключом
const requestTemplate = async (
  baseUrl: string,
  keyIndex: number,
  options?: { [key: string]: string }
) => {
  console.log(keyIndex);
  const response = await axios.get(baseUrl, {
    ...options,
    headers: {
      "X-API-KEY": apiKeys[keyIndex],
    },
  });
  return response;
};

// get запрос для фильмов по типу коллекции и страницы
export const getMoviesByCollection = async (
  type: MoviesTopTypesEnum,
  page: number,
  keyIndex: number
): Promise<MoviesCollectionResponseI> => {
  const resp = await requestTemplate(
    `${movies}/top?type=${type}&page=${page}`,
    keyIndex
  );
  return resp.data;
};

// get запрос для всех стран и жанров
export const getAllCountriesAndGenres = async (
  keyIndex: number
): Promise<CountriesAndGenresResponseI> => {
  const resp = await requestTemplate(`${movies}/filters`, keyIndex);
  return resp.data;
};
// get запрос для фильма по айди
export const getMovieById = async (
  id: number,
  keyIndex: number
): Promise<MovieI> => {
  const resp = await requestTemplate(`${movies}/${id}`, keyIndex);
  return resp.data;
};

//get запрос для сезонов сериала
export const getTvShowSeasons = async (
  id: number,
  keyIndex: number
): Promise<SeasonResponseI> => {
  const resp = await requestTemplate(`${movies}/${id}/seasons`, keyIndex);
  return resp.data;
};

// get запрос для фактов фильма/сериала
export const getMovieFacts = async (
  id: number,
  keyIndex: number
): Promise<FactResponseI> => {
  const resp = await requestTemplate(`${movies}/${id}/facts`, keyIndex);
  return resp.data;
};

//get запрос для данных о прокате фильма
export const getMovieDistribution = async (
  id: number,
  keyIndex: number
): Promise<DistributionResponseI> => {
  const resp = await requestTemplate(`${movies}/${id}/distributions`, keyIndex);
  return resp.data;
};

// get запрос для данных о бюджете и сборах фильма
export const getMovieBoxOffice = async (
  id: number,
  keyIndex: number
): Promise<BoxOfficeResponseI> => {
  const resp = await requestTemplate(`${movies}/${id}/box_office`, keyIndex);
  return resp.data;
};

//get запрос для наград фильма
export const getMovieAwards = async (
  id: number,
  keyIndex: number
): Promise<AwardResponseI> => {
  const resp = await requestTemplate(`${movies}/${id}/awards`, keyIndex);
  return resp.data;
};

//get запрос для видео по фильму
export const getMovieVideos = async (
  id: number,
  keyIndex: number
): Promise<VideoResponseI> => {
  const resp = await requestTemplate(`${movies}/${id}/videos`, keyIndex);
  return resp.data;
};

//get запрос для похожих о фильмов
export const getMovieSimilars = async (
  id: number,
  keyIndex: number
): Promise<RelatedMovieResponseI> => {
  const resp = await requestTemplate(`${movies}/${id}/similars`, keyIndex);
  return resp.data;
};

//get запрос для изображений по фильму
export const getMovieImages = async (
  id: number,
  keyIndex: number
): Promise<ImageResponseI> => {
  const resp = await requestTemplate(`${movies}/${id}/images`, keyIndex);
  return resp.data;
};

//get запрос для отзывов о фильме
export const getMovieReviews = async (
  id: number,
  keyIndex: number
): Promise<ReviewsResponseI> => {
  const resp = await requestTemplate(`${movies}/${id}/reviews`, keyIndex);
  return resp.data;
};

// get запрос для кинопремьер
export const getPremiereMovies = async (
  year: number,
  month: string,
  keyIndex: number
): Promise<PremiereResponseI> => {
  const resp = await requestTemplate(
    `${movies}/premieres?year=${year}&month=${month}`,
    keyIndex
  );
  return resp.data;
};

//get запрос для сиквелов и приквелов фильма
export const getMovieSequelsAndPrequels = async (
  id: number,
  keyIndex: number
): Promise<MovieSequelsAndPrequelsResponseI[]> => {
  const resp = await requestTemplate(
    `${moviesV2}/${id}/sequels_and_prequels`,
    keyIndex
  );
  return resp.data;
};

//get запрос для поиска фильма по ключевому слову
export const getMovieBySearch = async (
  keyword: string,
  keyIndex: number,
  page: number = 1
): Promise<MovieSearchResponseI> => {
  const resp = await requestTemplate(
    `${moviesV2}/search-by-keyword?keyword=${keyword}&page=${page}`,
    keyIndex
  );
  return resp.data;
};

//get запрос для списка цифровых релизов
export const getReleases = async (
  year: number,
  month: string,
  keyIndex: number,
  page: number = 1
): Promise<DigitalReleaseResponseI> => {
  const resp = await requestTemplate(
    `${moviesV2}/releases?year=${year}&month=${month}&page=${page}`,
    keyIndex
  );
  return resp.data;
};

//get запрос о команде фильма
export const getMovieStaff = async (
  id: number,
  keyIndex: number
): Promise<StaffResponseI[]> => {
  const resp = await requestTemplate(`${staff}?filmId=${id}`, keyIndex);
  return resp.data;
};

// get запрос о конкретном человеке
export const getStaffPerson = async (
  id: number,
  keyIndex: number
): Promise<StaffPersonSearchResponseI> => {
  const resp = await requestTemplate(`${staff}/${id}`, keyIndex);
  return resp.data;
};

//get запрос для поиска персоны
export const getPersonBySearch = async (
  name: string,
  keyIndex: number,
  page = 1
): Promise<PersonByNameResponseI> => {
  const resp = await requestTemplate(
    `${person}?name=${name}&page=${page}`,
    keyIndex
  );
  return resp.data;
};

export const getMovieFilters = async (
  {
    country,
    genre,
    order = "RATING",
    type = "ALL",
    ratingFrom = 0,
    ratingTo = 10,
    yearFrom = 1000,
    yearTo = 3000,
    page = 1,
  }: FilterOptionsI,
  keyIndex: number
): Promise<MovieSearchByFiltersResponseI> => {
  const url = new URLSearchParams();
  if (country) url.set("countries", String(country));
  if (genre) url.set("genres", String(genre));
  url.set("order", String(order));
  url.set("type", String(type));
  url.set("ratingFrom", String(ratingFrom));
  url.set("ratingTo", String(ratingTo));
  url.set("yearFrom", String(yearFrom));
  url.set("yearTo", String(yearTo));
  url.set("page", String(page));

  const resp = await requestTemplate(`${movies}?${url}`, keyIndex);

  return resp.data;
};
