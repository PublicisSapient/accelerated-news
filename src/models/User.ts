export interface User {
  email: string;
  name: string;
}

export interface UserInfo extends User {
  password: string;
}
