import { formatHttpError } from '@http-utils/core';
import axios from 'axios';
import { Credentials, User, SignUpInput } from '../models';
import { Storage } from '../utils';

const TOKEN_KEY = 'accessToken';
const SIGN_IN_REDIRECT_KEY = 'signInRedirect';

const getAccessToken = () => {
  return Storage.get(TOKEN_KEY);
};

const setAccessToken = (accessToken: string) => {
  return Storage.set(TOKEN_KEY, accessToken);
};

const removeAccessToken = () => {
  return Storage.remove(TOKEN_KEY);
};

const getSignInRedirectPath = () => {
  return Storage.get(SIGN_IN_REDIRECT_KEY, '/');
};

const setSignInRedirectPath = (path: string) => {
  return Storage.set(SIGN_IN_REDIRECT_KEY, path);
};

const removeSignInRedirectPath = () => {
  return Storage.remove(SIGN_IN_REDIRECT_KEY);
};

const fetchUser = async (): Promise<User | undefined> => {
  const token = Storage.get(TOKEN_KEY);
  if (!token) return;

  try {
    const resp = await axios.get('/auth/me');
    return resp.data;
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

const signIn = async (credentials: Credentials): Promise<User> => {
  try {
    const resp = await axios.post('/auth/signin', credentials);
    const { accessToken, user } = resp.data;
    setAccessToken(accessToken);
    return user;
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

const signOut = async (): Promise<Boolean> => {
  try {
    const resp = await axios.post('/auth/signout');
    removeAccessToken();
    return resp.data;
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

const signUp = async (signUpInput: SignUpInput): Promise<User> => {
  try {
    const resp = await axios.post('/auth/signup', signUpInput);
    const { accessToken, user } = resp.data;
    setAccessToken(accessToken);
    return user;
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

export const AuthService = {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getSignInRedirectPath,
  setSignInRedirectPath,
  removeSignInRedirectPath,
  fetchUser,
  signIn,
  signOut,
  signUp,
};
