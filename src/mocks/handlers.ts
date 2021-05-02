import { rest, RestRequest, ResponseComposition, RestContext } from 'msw';
import { HttpStatusCode } from '@http-utils/core';
import { v4 as uuidv4 } from 'uuid';
import { Credentials, Headline, UserInfo } from '../models';
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

const { Created, Forbidden, NotFound, Unauthorized } = HttpStatusCode;

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
  const accessToken = parts[1];

  if (scheme === 'Bearer') {
    return accessToken;
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
    const accessToken = parseAccessToken(req);
    if (!accessToken) {
      return createErrorResponse(res, ctx, Unauthorized, 'Unauthorized');
    }

    const email = getTokenValue(accessToken);
    if (!email) {
      return createErrorResponse(res, ctx, Unauthorized, 'Unauthorized');
    }

    const existingUser = getUser(email);
    if (!existingUser) {
      return createErrorResponse(res, ctx, Unauthorized, 'Unauthorized');
    }

    const { password, ...user } = existingUser;
    return createSuccessResponse(res, ctx, {
      accessToken: accessToken,
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
        Unauthorized,
        'Email or password did not match'
      );
    }

    const accessToken = uuidv4();
    setTokenValue(accessToken, existingUser.email);

    const { password, ...user } = existingUser;
    return createSuccessResponse(res, ctx, {
      accessToken,
      user,
    });
  }),

  /** sign out */
  rest.post(`${API_URL}/auth/signout`, (req, res, ctx) => {
    const accessToken = parseAccessToken(req);
    if (!accessToken) {
      return createSuccessResponse(res, ctx, true);
    }

    removeToken(accessToken);
    return createSuccessResponse(res, ctx, true);
  }),

  /** sign up */
  rest.post(`${API_URL}/auth/signup`, (req, res, ctx) => {
    const requestedUser: UserInfo = req.body as UserInfo;
    const existingUser = getUser(requestedUser?.email);
    if (existingUser) {
      return createErrorResponse(
        res,
        ctx,
        Unauthorized,
        'The user already exists'
      );
    }

    if (requestedUser) {
      const createdUser = setUser(requestedUser);
      if (createdUser) {
        const accessToken = uuidv4();
        setTokenValue(accessToken, requestedUser.email);

        const { password, ...user } = createdUser;
        return createSuccessResponse(res, ctx, {
          accessToken,
          user,
        });
      }
    }
  }),

  /** get headlines */
  rest.get(`${API_URL}/headlines`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockHeadlines));
  }),

  /** get headline */
  rest.get(`${API_URL}/headlines/:headlineId`, (req, res, ctx) => {
    const { headlineId } = req.params;
    const headline = mockHeadlines.find(
      (headline) => headline.id === headlineId
    );
    if (headline !== undefined) {
      return res(ctx.status(200), ctx.json(headline));
    } else {
      return createErrorResponse(res, ctx, NotFound, 'Headline does not exist');
    }
  }),

  /** create a headline */
  rest.post(`${API_URL}/headlines`, (req, res, ctx) => {
    const accessToken = parseAccessToken(req);
    if (!accessToken) {
      return createErrorResponse(
        res,
        ctx,
        Forbidden,
        "You don't have permission to create headlines"
      );
    }

    const headline: Headline = req.body as Headline;
    mockHeadlines.push(headline);
    return res(ctx.delay(500), ctx.status(Created), ctx.json({ headline }));
  }),

  /** update a headline */
  rest.put(`${API_URL}/headlines/:headlineId`, (req, res, ctx) => {
    const { headlineId } = req.params;
    const accessToken = parseAccessToken(req);
    if (!accessToken) {
      return createErrorResponse(
        res,
        ctx,
        Forbidden,
        "You don't have permission to update headlines"
      );
    }

    const newHeadline: Headline = req.body as Headline;
    const index = mockHeadlines.findIndex(
      (headline) => headline.id === headlineId
    );
    if (index >= 0) {
      // replace the headline in the array
      mockHeadlines.splice(index, 1, newHeadline);
      return res(ctx.status(200), ctx.json(newHeadline));
    } else {
      return createErrorResponse(res, ctx, NotFound, 'Headline does not exist');
    }
  }),

  /** get standings */
  rest.get(`${API_URL}/standings`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockStandings));
  }),
];
