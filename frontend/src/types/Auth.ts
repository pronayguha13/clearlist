export type UserDetail = {
  username: string;
  password: string;
  email: string;
}

export type LoginCredentials = Omit<UserDetail, "email">
