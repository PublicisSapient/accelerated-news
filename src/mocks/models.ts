import { User } from '../models';

export type UserId = string;

export interface DbUser extends User {
  password: string;
}
