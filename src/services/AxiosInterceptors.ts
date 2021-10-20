import axios from 'axios';
import { WindowEnv } from '../models';
import { EnvVar } from '../utils';
import { AuthService } from './AuthService';

// ----- Axios interceptor to configure all requests -----
axios.interceptors.request.use(async (config) => {
  // configure baseURL
  const env = new WindowEnv();
  config.baseURL = env.get(EnvVar.API_URL);

  // add access token if present
  const token = AuthService.getAccessToken();
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }

  return config;
});
