import type { UserModel } from "./user.types";

export interface AuthResponseModel {
  user: UserModel;
  token: string;
}

export interface AuthBodyModel {
  login: string;
  password: string;
}
