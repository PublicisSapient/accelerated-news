import { Headline } from '../models';
import { Storage } from '../utils';
import { mockHeadlines } from './mockHeadlines';
import { mockStandings } from './mockStandings';
import { DbUser, UserId } from './models';

const USERS_KEY = 'mockDbUsers';
const TOKENS_KEY = 'mockDbTokens';
const HEADLINES_KEY = 'mockDbHeadlines';
const STANDINGS_KEY = 'mockDbStandings';

// The mock database keeps all data in memory. However it is backed by
// localStorage. Anytime a value is written to the in-memory database,
// it is also persisted to localStorage.

// -------------------- Initialize in-memory database --------------------
// users & tokens
const users: Array<DbUser> = Storage.get(USERS_KEY, []);
const tokens: { [token: string]: UserId } = Storage.get(TOKENS_KEY, {});

// headlines
const headlines: Array<Headline> = Storage.get(HEADLINES_KEY, mockHeadlines);

// standings
const standings = Storage.get(STANDINGS_KEY, mockStandings);
// -----------------------------------------------------------------------

function getUser(id: string): DbUser | undefined {
  return users.find((user) => user.id === id);
}

function getUserByEmail(email: string): DbUser | undefined {
  return users.find((user) => user.email === email);
}

function createUser(dbUser: DbUser) {
  users.push(dbUser);
  Storage.set(USERS_KEY, users);
}

function getTokenValue(token: string): UserId | undefined {
  return tokens[token];
}

function setTokenValue(token: string, value: UserId) {
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
  getUserByEmail,
  createUser,
  getTokenValue,
  setTokenValue,
  removeToken,
  getHeadlines,
  getHeadline,
  createHeadline,
  updateHeadline,
  getStandings,
};
