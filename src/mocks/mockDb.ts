import { Headline, UserInfo } from '../models';
import { Storage } from '../utils';
import { mockHeadlines } from './mockHeadlines';
import { mockStandings } from './mockStandings';

const USERS_KEY = 'mockDbUsers';
const TOKENS_KEY = 'mockDbTokens';
const HEADLINES_KEY = 'mockDbHeadlines';
const STANDINGS_KEY = 'mockDbStandings';

// The mock database keeps all data in memory. However it is backed by
// localStorage. Anytime a value is written to the in-memory database,
// it is also persisted to localStorage.

// -------------------- Initialize in-memory database --------------------
// users & tokens
const users: { [key: string]: UserInfo } = Storage.get(USERS_KEY, {});
const tokens: { [key: string]: string } = Storage.get(TOKENS_KEY, {});

// headlines
const headlines: Array<Headline> = Storage.get(HEADLINES_KEY, mockHeadlines);

// standings
const standings = Storage.get(STANDINGS_KEY, mockStandings);
// -----------------------------------------------------------------------

function getUser(email: string): UserInfo | undefined {
  return users[email];
}

function setUser(userInfo: UserInfo): UserInfo | undefined {
  if (userInfo?.email) {
    users[userInfo.email] = userInfo;
    Storage.set(USERS_KEY, users);
    return userInfo;
  } else {
    return undefined;
  }
}

function getTokenValue(token: string): string | undefined {
  return tokens[token];
}

function setTokenValue(token: string, value: string) {
  tokens[token] = value;
  Storage.set(TOKENS_KEY, tokens);
}

function removeToken(token: string) {
  delete tokens[token];
  Storage.set(TOKENS_KEY, tokens);
}

function getHeadlines() {
  return headlines;
}

function getHeadline(id: string) {
  return headlines.find((headline) => headline.id === id);
}

function createHeadline(headline: Headline) {
  headlines.push(headline);
  Storage.set(HEADLINES_KEY, headlines);
}

function updateHeadline(updatedHeadline: Headline) {
  const index = headlines.findIndex(
    (headline) => headline.id === updatedHeadline.id
  );
  if (index >= 0) {
    // replace the headline in the array
    headlines.splice(index, 1, updatedHeadline);
    Storage.set(HEADLINES_KEY, headlines);
  } else {
    throw new Error('Headline does not exist');
  }
}

function getStandings() {
  return standings;
}

export const mockDb = {
  getUser,
  setUser,
  getTokenValue,
  setTokenValue,
  removeToken,
  getHeadlines,
  getHeadline,
  createHeadline,
  updateHeadline,
  getStandings,
};
