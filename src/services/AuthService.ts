import axios from 'axios';
import { Credentials, User, UserInfo } from '../models';
import { Storage } from '../utils';

const TOKEN_KEY = 'accessToken';
const SIGN_IN_REDIRECT_KEY = 'signInRedirect';

const getAccessToken = () => {
  return Storage.get(TOKEN_KEY);
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
  if (token) {
    const resp = await axios.get('/auth/me');
    const { user } = resp.data;
    return user;
  }
};

const signIn = async (credentials: Credentials): Promise<User> => {
  const resp = await axios.post('/auth/signin', credentials);
  const { accessToken, user } = resp.data;
  Storage.set(TOKEN_KEY, accessToken);
  return user;
};

const signOut = async (): Promise<Boolean> => {
  const resp = await axios.post('/auth/signout');
  Storage.remove(TOKEN_KEY);
  return resp.data;
};

const signUp = async (userInfo: UserInfo): Promise<User> => {
  const resp = await axios.post('/auth/signup', userInfo);
  const { accessToken, user } = resp.data;
  Storage.set(TOKEN_KEY, accessToken);
  return user;
};

export const AuthService = {
  getAccessToken,
  getSignInRedirectPath,
  setSignInRedirectPath,
  removeSignInRedirectPath,
  fetchUser,
  signIn,
  signOut,
  signUp,
};
