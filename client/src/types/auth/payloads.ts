export interface LoginPayload {
  password: string;
  email: string;
}

export interface RegisterPayload extends LoginPayload {
  username: string;
  repeatPassword: string;
}
