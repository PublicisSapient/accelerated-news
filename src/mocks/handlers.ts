import { rest, RestRequest, ResponseComposition, RestContext } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import { Credentials, UserInfo } from '../models';
import {
  getUser,
  setUser,
  getTokenValue,
  setTokenValue,
  removeToken,
} from './mockDb';
import { mockHeadlines } from './mockHeadlines';
import { mockStandings } from './mockStandings';

const API_URL = 'http://localhost:8080';

function parseAccessToken(req: RestRequest) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return;
  }

  const scheme = parts[0];
  const token = parts[1];

  if (scheme === 'Bearer') {
    return token;
  }
}

function createSuccessResponse(
  res: ResponseComposition,
  ctx: RestContext,
  data: any
) {
  return res(ctx.delay(500), ctx.json(data));
}

function createErrorResponse(
  res: ResponseComposition,
  ctx: RestContext,
  status: number,
  message: string
) {
  return res(ctx.delay(500), ctx.status(status), ctx.json({ message }));
}

export const handlers = [
  /** get user information */
  rest.get(`${API_URL}/auth/me`, (req, res, ctx) => {
    const token = parseAccessToken(req);
    if (!token) {
      return createErrorResponse(res, ctx, 400, 'Unauthorized');
    }

    const email = getTokenValue(token);
    if (!email) {
      return createErrorResponse(res, ctx, 400, 'Unauthorized');
    }

    const existingUser = getUser(email);
    if (!existingUser) {
      return createErrorResponse(res, ctx, 400, 'Unauthorized');
    }

    const { password, ...user } = existingUser;
    return createSuccessResponse(res, ctx, {
      access_token: token,
      user,
    });
  }),

  /** sign in */
  rest.post(`${API_URL}/auth/signin`, (req, res, ctx) => {
    const credentials: Credentials = req.body as Credentials;

    const existingUser = getUser(credentials.email);
    if (!existingUser || existingUser.password !== credentials.password) {
      return createErrorResponse(
        res,
        ctx,
        400,
        'Email or password did not match'
      );
    }

    const token = uuidv4();
    setTokenValue(token, existingUser.email);

    const { password, ...user } = existingUser;
    return createSuccessResponse(res, ctx, {
      access_token: token,
      user,
    });
  }),

  /** sign out */
  rest.post(`${API_URL}/auth/signout`, (req, res, ctx) => {
    const token = parseAccessToken(req);
    if (!token) {
      return createSuccessResponse(res, ctx, true);
    }

    removeToken(token);
    return createSuccessResponse(res, ctx, true);
  }),

  /** sign up */
  rest.post(`${API_URL}/auth/signup`, (req, res, ctx) => {
    const requestedUser: UserInfo = req.body as UserInfo;
    const existingUser = getUser(requestedUser?.email);
    if (existingUser) {
      return createErrorResponse(res, ctx, 400, 'The user already exists');
    }

    if (requestedUser) {
      const createdUser = setUser(requestedUser);
      if (createdUser) {
        const token = uuidv4();
        setTokenValue(token, requestedUser.email);

        const { password, ...user } = createdUser;
        return createSuccessResponse(res, ctx, {
          access_token: token,
          user,
        });
      }
    }
  }),

  /** get headlines */
  rest.get(`${API_URL}/headlines`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockHeadlines));
  }),

  /** get standings */
  rest.get(`${API_URL}/standings`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockStandings));
  }),
];
