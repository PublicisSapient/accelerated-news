import { UserInfo } from '../models';
import { Storage } from '../utils';

const USERS_KEY = 'mockDbUsers';
const TOKENS_KEY = 'mockDbTokens';

const users: { [key: string]: UserInfo } = Storage.get(USERS_KEY, {});
const tokens: { [key: string]: string } = Storage.get(TOKENS_KEY, {});

export function setUser(userInfo: UserInfo): UserInfo | undefined {
  if (userInfo?.email) {
    users[userInfo.email] = userInfo;
    Storage.set(USERS_KEY, users);
    return userInfo;
  } else {
    return undefined;
  }
}

export function getUser(email: string): UserInfo | undefined {
  return users[email];
}

export function setTokenValue(token: string, value: string) {
  tokens[token] = value;
  Storage.set(TOKENS_KEY, tokens);
}

export function getTokenValue(token: string): string | undefined {
  return tokens[token];
}

export function removeToken(token: string) {
  delete tokens[token];
  Storage.set(TOKENS_KEY, tokens);
}
