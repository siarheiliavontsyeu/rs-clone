export interface UserModel {
  id: string;
  name: string;
  login: string;
  subscription: string;
}

export interface UserRegistrationModel {
  name: string;
  login: string;
  password: string;
}
