import axios from 'axios';
import { Credentials, User, UserInfo } from '../models';
import { Storage } from '../utils';

const TOKEN_KEY = 'access_token';

const getAccessToken = () => {
  return Storage.get(TOKEN_KEY);
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
  const { access_token, user } = resp.data;
  Storage.set(TOKEN_KEY, access_token);
  return user;
};

const signOut = async (): Promise<Boolean> => {
  const resp = await axios.post('/auth/signout');
  Storage.remove(TOKEN_KEY);
  return resp.data;
};

const signUp = async (userInfo: UserInfo): Promise<User> => {
  const resp = await axios.post('/auth/signup', userInfo);
  const { access_token, user } = resp.data;
  Storage.set(TOKEN_KEY, access_token);
  return user;
};

export const AuthService = {
  getAccessToken,
  fetchUser,
  signIn,
  signOut,
  signUp,
};
