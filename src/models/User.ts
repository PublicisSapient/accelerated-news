export interface User {
  email: string;
  displayName: string;
}

export interface UserInfo extends User {
  password: string;
}
