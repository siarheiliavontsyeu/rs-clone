export interface ICountry {
  country: string;
}

export interface IGenre {
  genre: string;
}

export enum FactTypeEnum {
  fact = "FACT",
  blooper = "BLOOPER",
}

export enum MoviesTopTypesEnum {
  top250 = "TOP_250_BEST_FILMS",
  top100 = "TOP_100_POPULAR_FILMS",
  topAwait = "TOP_AWAIT_FILMS",
}

export enum MovieProductionStatusEnum {
  filming = "FILMING",
  preProduction = "PRE_PRODUCTION",
  completed = "COMPLETED",
  announces = "ANNOUNCED",
  unknown = "UNKNOWN",
  postProduction = "POST_PRODUCTION",
}

export enum MovieTypeEnum {
  film = "FILM",
  video = "VIDEO",
  tvSeries = "TV_SERIES",
  miniSeries = "MINI_SERIES",
  tvShow = "TV_SHOW",
}

export enum RelationTypeEnum {
  sequel = "SEQUEL",
  prequel = "PREQUEL",
  remaker = "REMAKE",
  unknown = "UNKNOWN",
}

export enum ReviewTypeEnum {
  positive = "POSITIVE",
  negative = "NEGATIVE",
  neutral = "NEUTRAL",
  unknown = "UNKNOWN",
}

export enum ProfessionTypeEnum {
  writer = "WRITER",
  operator = "OPERATOR",
  editor = "EDITOR",
  composer = "COMPOSER",
  producerUSSR = "PRODUCER_USSR",
  translator = "TRANSLATOR",
  director = "DIRECTOR",
  design = "DESIGN",
  producer = "PRODUCER",
  actor = "ACTOR",
  voiceDirector = "VOICE_DIRECTOR",
  unknown = "UNKNOWN",
}

export enum GenderTypeEnum {
  male = "MALE",
  female = "FEMALE",
}

export enum VideoTypeEnum {
  youtube = "YOUTUBE",
  kinopoiskWidget = "KINOPOISK_WIDGET",
  unknown = "UNKNOWN",
}

export interface IEpisode {
  seasonNumber: number;
  episodeNumber: number;
  nameRu: string;
  nameEn: string;
  synopsis: string;
  releaseDate: string;
}

export interface IMovie {
  kinopoiskId: number;
  imdbId: string;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreview: string;
  coverUrl: string;
  logoUrl: string;
  reviewsCount: number;
  ratingGoodReview: number;
  ratingGoodReviewVoteCount: number;
  ratingKinopoisk: number;
  ratingKinopoiskVoteCount: number;
  ratingImdb: number;
  ratingImdbVoteCount: number;
  ratingFilmCritics: number;
  ratingFilmCriticsVoteCount: number;
  ratingAwait: number;
  ratingAwaitCount: number;
  ratingRfCritics: number;
  ratingRfCriticsVoteCount: number;
  webUrl: string;
  year: number;
  filmLength: number;
  slogan: string;
  description: string;
  shortDescription: string;
  editorAnnotation: string;
  isTicketsAvailable: boolean;
  productionStatus: MovieProductionStatusEnum;
  type: MovieTypeEnum;
  ratingMpaa: string;
  ratingAgeLimits: string;
  hasImax: boolean;
  has3D: boolean;
  lastSync: string;
  countries: ICountry[];
  genres: IGenre[];
  startYear: number;
  endYear: number;
  serial?: boolean;
  shortFilm?: boolean;
  completed?: boolean;
}

export interface ISeason {
  number: number;
  episodes: IEpisode[];
}

export interface ISeasonResponse {
  total: number;
  items: ISeason[];
}

export interface IFact {
  text: string;
  type: FactTypeEnum;
  spoiler: boolean;
}
export interface IFactResponse {
  total: number;
  items: IFact[];
}

export interface IBoxOffice {
  type: string;
  amount: number;
  currencyCode: string;
  name: string;
  symbol: string;
}

export interface IBoxOfficeResponse {
  total: number;
  items: IBoxOffice[];
}
export interface ICompany {
  name: string;
}
export interface IDistribution {
  type: string;
  subType: string;
  date: string;
  reRelease: boolean;
  country: ICountry;
  companies: ICompany[];
}

export interface IDistributionResponse {
  total: number;
  items: IDistribution[];
}

export interface IAward {
  name: string;
  win: boolean;
  imageUrl: string;
  nominationName: string;
  year: number;
  persons: IAwardPerson[];
}

export interface IAwardResponse {
  total: number;
  items: IAward[];
}

export interface IAwardPerson {
  kinopoiskId: number;
  webUrl: string;
  nameRu: string;
  nameEn: string;
  sex: string;
  posterUrl: string;
  growth: number;
  birthday: string;
  death: string;
  age: number;
  birthplace: string;
  deathplace: string;
  profession: string;
}

export interface IMovieSearch {
  filmId: number;
  nameRu: string;
  nameEn: string;
  type: Omit<MovieTypeEnum, "VIDEO" | "TV_SERIES" | "MINI_SERIES"> | "UNKNOWN";
  year: string;
  description: string;
  filmLength: string;
  countries: ICountry[];
  genres: IGenre[];
  rating: string;
  ratingVoteCount: number;
  posterUrl: string;
  posterUrlPreview: string;
}

export interface IMovieSearchResponse {
  keyword: string;
  pagesCount: number;
  searchFilmsCountResult: number;
  films: IMovieSearch[];
}

export interface IMovieSearchByFilters {
  kinopoiskId: number;
  imdbId: string;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  countries: ICountry[];
  genres: IGenre[];
  ratingKinopoisk: number;
  ratingImdb: number;
  year: number;
  type: MovieTypeEnum | "UNKNOWN";
  posterUrl: string;
  posterUrlPreview: string;
}

export interface IMovieSearchByFiltersResponse {
  total: number;
  totalPages: number;
  items: IMovieSearchByFilters[];
}

export interface IMovieSequelsAndPrequelsResponse {
  filmId: number;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreview: string;
  relationType: RelationTypeEnum;
}

export interface IRelatedMovie {
  filmId: number;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreview: string;
  relationType: RelationTypeEnum;
}

export interface IRelatedMovieResponse {
  totals: number;
  items: IRelatedMovie[];
}

export interface IReviewsResponse {
  total: number;
  totalPages: number;
  totalPositiveReviews: number;
  totalNegativeReviews: number;
  totalNeutralReviews: number;
  items: IReviewResponse[];
}

export interface IReviewResponse {
  kinopoiskId: number;
  type: ReviewTypeEnum;
  date: string;
  positiveRating: number;
  negativeRating: number;
  author: string;
  title: string;
  description: string;
}

export interface IMovieFromCollection {
  filmId: number;
  nameRu: string;
  nameEn: string;
  year: string;
  genres: IGenre[];
  countries: ICountry[];
  filmLength: string;
  rating: string;
  ratingVoteCount: number;
  posterUrl: string;
  posterUrlPreview: string;
}

export interface IMoviesCollectionResponse {
  pagesCount: number;
  films: IMovieFromCollection[];
}

export interface ICountriesAndGenresResponse {
  genres: IFilterGenreResponse[];
  countries: IFilterCountryResponse[];
}

export interface IStaffResponse {
  professionKey: ProfessionTypeEnum;
  staffId: number;
  nameRu: string;
  nameEn: string;
  description: string;
  posterUrl: string;
  professionText: string;
}

export interface IStaffPersonSearchResponse {
  personId: number;
  webUrl: string;
  nameRu: string;
  nameEn: string;
  sex: GenderTypeEnum;
  posterUrl: string;
  growth: string;
  birthday: string;
  death: string;
  age: number;
  birthplace: string;
  deathplace: string;
  hasAwards: number;
  profession: string;
  facts: string[];
  spouses: IPersonSpouses[];
  films: IPersonRelatedMovies[];
}

export interface IPersonSpouses {
  personId: number;
  name: string;
  divorced: boolean;
  divorcedReason: string;
  sex: GenderTypeEnum;
  children: number;
  webUrl: string;
  relation: string;
}

export interface IPersonRelatedMovies {
  filmId: number;
  nameRu: string;
  nameEn: string;
  rating: string;
  general: boolean;
  description: string;
  professionKey: string;
}

export interface IPersonByNameResponse {
  total: number;
  items: IPersonByName[];
}

export interface IPersonByName {
  kinopoiskId: number;
  webUrl: string;
  nameRu: string;
  nameEn: string;
  sex: GenderTypeEnum | "UNKNOWN";
  posterUrl: string;
}

export interface IImage {
  imageUrl: string;
  previewUrl: string;
}

export interface IImageResponse {
  total: number;
  totalPages: number;
  items: IImage[];
}

export interface IPremiereResponse {
  total: number;
  items: IPremiereMovie[];
}

export interface IPremiereMovie {
  kinopoiskId: number;
  nameRu: string;
  nameEn: string;
  year: number;
  posterUrl: string;
  posterUrlPreview: string;
  countries: ICountry[];
  genres: IGenre[];
  duration: number;
  premiereRu: string;
}

export interface IDigitalReleaseResponse {
  page: number;
  total: number;
  releases: IDigitalReleaseMovie[];
}

export interface IDigitalReleaseMovie {
  filmId: number;
  nameRu: string;
  nameEn: string;
  year: number;
  posterUrl: string;
  posterUrlPreview: string;
  countries: ICountry[];
  genres: IGenre[];
  rating: number;
  ratingVoteCount: number;
  expectationsRating: number;
  expectationsRatingVoteCount: number;
  duration: number;
  releaseDate: string;
}

export interface IVideo {
  url: string;
  name: string;
  site: VideoTypeEnum;
}

export interface IVideoResponse {
  total: number;
  items: IVideo[];
}
export interface IApiError {
  message: string;
}

export interface IFilterCountryResponse {
  id: number;
  country: string;
}

export interface IFilterGenreResponse {
  id: number;
  genre: string;
}

export interface ReviewModel {
  userId: string;
  rating: number;
  text: string;
  at: string;
}

export interface CritiqueModel {
  userId: string;
  text: string;
  at: string;
}

export interface MovieModel {
  kinopoiskId: string;
  imdbId: string;
  nameRu: string;
  nameOriginal: string;
  posterUrlPreview: string;
  ratingKinopoisk: number;
  reviews: ReviewModel[];
  critiques: CritiqueModel[];
  watchedAt?: string;
}
