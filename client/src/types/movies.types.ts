export enum GenderTypeEnum {
  male = "MALE",
  female = "FEMALE",
}
export enum FactTypeEnum {
  fact = "FACT",
  blooper = "BLOOPER",
}
export enum MovieProductionStatusEnum {
  filming = "FILMING",
  preProduction = "PRE_PRODUCTION",
  completed = "COMPLETED",
  announces = "ANNOUNCED",
  unknown = "UNKNOWN",
  postProduction = "POST_PRODUCTION",
}
export enum MoviesTopTypesEnum {
  top250 = "TOP_250_BEST_FILMS",
  top100 = "TOP_100_POPULAR_FILMS",
  topAwait = "TOP_AWAIT_FILMS",
}
export enum MovieTypeEnum {
  film = "FILM",
  video = "VIDEO",
  tvSeries = "TV_SERIES",
  miniSeries = "MINI_SERIES",
  tvShow = "TV_SHOW",
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
export enum VideoTypeEnum {
  youtube = "YOUTUBE",
  kinopoiskWidget = "KINOPOISK_WIDGET",
  unknown = "UNKNOWN",
}

export interface ApiErrorI {
  message: string;
}
export interface AwardI {
  name: string;
  win: boolean;
  imageUrl: string;
  nominationName: string;
  year: number;
  persons: AwardPersonI[];
}
export interface AwardPersonI {
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
export interface AwardResponseI {
  total: number;
  items: AwardI[];
}
export interface BoxOfficeI {
  type: string;
  amount: number;
  currencyCode: string;
  name: string;
  symbol: string;
}
export interface BoxOfficeResponseI {
  total: number;
  items: BoxOfficeI[];
}
export interface CompanyI {
  name: string;
}
export interface CountryI {
  country: string;
}
export interface CountriesAndGenresResponseI {
  genres: FilterGenreResponseI[];
  countries: FilterCountryResponseI[];
}
export interface DigitalReleaseResponseI {
  page: number;
  total: number;
  releases: DigitalReleaseMovieI[];
}
export interface DigitalReleaseMovieI {
  filmId: number;
  nameRu: string;
  nameEn: string;
  year: number;
  posterUrl: string;
  posterUrlPreview: string;
  countries: CountryI[];
  genres: GenreI[];
  rating: number;
  ratingVoteCount: number;
  expectationsRating: number;
  expectationsRatingVoteCount: number;
  duration: number;
  releaseDate: string;
}
export interface DistributionI {
  type: string;
  subType: string;
  date: string;
  reRelease: boolean;
  country: CountryI;
  companies: CompanyI[];
}
export interface DistributionResponseI {
  total: number;
  items: DistributionI[];
}
export interface EpisodeI {
  seasonNumber: number;
  episodeNumber: number;
  nameRu: string;
  nameEn: string;
  synopsis: string;
  releaseDate: string;
}
export interface FactI {
  text: string;
  type: FactTypeEnum;
  spoiler: boolean;
}
export interface FactResponseI {
  total: number;
  items: FactI[];
}
export interface FilterCountryResponseI {
  id: number;
  country: string;
}
export interface FilterGenreResponseI {
  id: number;
  genre: string;
}
export interface FilterOptionsI {
  country?: number;
  genre?: number;
  order?: string;
  type?: string;
  ratingFrom?: number;
  ratingTo?: number;
  yearFrom?: number;
  yearTo?: number;
  imdbId?: string;
  keyword?: string;
  page: number;
}
export interface GenreI {
  genre: string;
}
export interface ImageI {
  imageUrl: string;
  previewUrl: string;
}
export interface ImageResponseI {
  total: number;
  totalPages: number;
  items: ImageI[];
}
export interface MovieI {
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
  countries: CountryI[];
  genres: GenreI[];
  startYear: number;
  endYear: number;
  serial?: boolean;
  shortFilm?: boolean;
  completed?: boolean;
}
export interface MovieFromCollectionI {
  filmId: number;
  nameRu: string;
  nameEn: string;
  year: string;
  genres: GenreI[];
  countries: CountryI[];
  filmLength: string;
  rating: string;
  ratingVoteCount: number;
  posterUrl: string;
  posterUrlPreview: string;
}
export interface MovieSearchByFiltersI {
  kinopoiskId: number;
  imdbId: string;
  nameRu: string;
  nameEn: null;
  nameOriginal: string;
  countries: CountryI[];
  genres: GenreI[];
  ratingKinopoisk: number;
  ratingImdb: number | null;
  year: number;
  type: MovieTypeEnum | "UNKNOWN";
  posterUrl: string;
  posterUrlPreview: string;
}
export interface MovieSearchByFiltersResponseI {
  total: number;
  totalPages: number;
  items: MovieSearchByFiltersI[];
}
export interface MovieSearchI {
  filmId: number;
  nameRu: string;
  nameEn: string;
  type: Omit<MovieTypeEnum, "VIDEO" | "TV_SERIES" | "MINI_SERIES"> | "UNKNOWN";
  year: string;
  description: string;
  filmLength: string;
  countries: CountryI[];
  genres: GenreI[];
  rating: string;
  ratingVoteCount: number;
  posterUrl: string;
  posterUrlPreview: string;
}
export interface MovieSearchResponseI {
  keyword: string;
  pagesCount: number;
  searchFilmsCountResult: number;
  films: MovieSearchI[];
}
export interface MovieSequelsAndPrequelsResponseI {
  filmId: number;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreview: string;
  relationType: RelationTypeEnum;
}
export interface MoviesCollectionResponseI {
  pagesCount: number;
  films: MovieFromCollectionI[];
}
export interface PersonByNameI {
  kinopoiskId: number;
  webUrl: string;
  nameRu: string;
  nameEn: string;
  sex: GenderTypeEnum | "UNKNOWN";
  posterUrl: string;
}
export interface PersonByNameResponseI {
  total: number;
  items: PersonByNameI[];
}
export interface PersonRelatedMoviesI {
  filmId: number;
  nameRu: string;
  nameEn: string;
  rating: string;
  general: boolean;
  description: string;
  professionKey: string;
}
export interface PersonSpousesI {
  personId: number;
  name: string;
  divorced: boolean;
  divorcedReason: string;
  sex: GenderTypeEnum;
  children: number;
  webUrl: string;
  relation: string;
}
export interface PremiereResponseI {
  total: number;
  items: PremiereMovieI[];
}
export interface PremiereMovieI {
  kinopoiskId: number;
  nameRu: string;
  nameEn: string;
  year: number;
  posterUrl: string;
  posterUrlPreview: string;
  countries: CountryI[];
  genres: GenreI[];
  duration: number;
  premiereRu: string;
}
export interface RelatedMovieI {
  filmId: number;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreview: string;
  relationType: RelationTypeEnum;
}
export interface RelatedMovieResponseI {
  totals: number;
  items: RelatedMovieI[];
}
export interface ReviewResponseI {
  kinopoiskId: number;
  type: ReviewTypeEnum;
  date: string;
  positiveRating: number;
  negativeRating: number;
  author: string;
  title: string;
  description: string;
}
export interface ReviewsResponseI {
  total: number;
  totalPages: number;
  totalPositiveReviews: number;
  totalNegativeReviews: number;
  totalNeutralReviews: number;
  items: ReviewResponseI[];
}
export interface SeasonI {
  number: number;
  episodes: EpisodeI[];
}
export interface SeasonResponseI {
  total: number;
  items: SeasonI[];
}
export interface StaffResponseI {
  professionKey: ProfessionTypeEnum;
  staffId: number;
  nameRu: string;
  nameEn: string;
  description: string;
  posterUrl: string;
  professionText: string;
}
export interface StaffPersonSearchResponseI {
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
  spouses: PersonSpousesI[];
  films: PersonRelatedMoviesI[];
}
export interface VideoI {
  url: string;
  name: string;
  site: VideoTypeEnum;
}
export interface VideoResponseI {
  total: number;
  items: VideoI[];
}

export interface CritiqueModel {
  _id: string;
  at: string;
  text: string;
  title: string;
  type: string;
  useful: number;
  useless: number;
  userId: string;
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
export interface ReviewModel {
  userId: string;
  rating: number;
  text: string;
  at: string;
}
