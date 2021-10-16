import { rest, RestRequest, ResponseComposition, RestContext } from 'msw';
import { HttpStatusCode } from '@http-utils/core';
import { v4 as uuidv4 } from 'uuid';
import { Credentials, Headline, SignUpInput } from '../models';
import { MOCK_API_URL } from './constants';
import { mockDb } from './mockDb';

const {
  createUser,
  getUser,
  getUserByEmail,
  getTokenValue,
  setTokenValue,
  removeToken,
  getHeadlines,
  getHeadline,
  createHeadline,
  updateHeadline,
  getStandings,
} = mockDb;

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
  /** get user */
  rest.get(`${MOCK_API_URL}/auth/me`, (req, res, ctx) => {
    const accessToken = parseAccessToken(req);
    if (!accessToken) {
      return createErrorResponse(res, ctx, Unauthorized, 'Unauthorized');
    }

    const userId = getTokenValue(accessToken);
    if (!userId) {
      return createErrorResponse(res, ctx, Unauthorized, 'Unauthorized');
    }

    const existingUser = getUser(userId);
    if (!existingUser) {
      return createErrorResponse(res, ctx, Unauthorized, 'Unauthorized');
    }

    const { password, ...user } = existingUser;
    return createSuccessResponse(res, ctx, user);
  }),

  /** sign in */
  rest.post(`${MOCK_API_URL}/auth/signin`, (req, res, ctx) => {
    const credentials: Credentials = req.body as Credentials;

    const existingUser = getUserByEmail(credentials.email);
    if (!existingUser || existingUser.password !== credentials.password) {
      return createErrorResponse(
        res,
        ctx,
        Unauthorized,
        'Email or password did not match'
      );
    }

    const accessToken = uuidv4();
    setTokenValue(accessToken, existingUser.id);

    const { password, ...user } = existingUser;
    return createSuccessResponse(res, ctx, {
      accessToken,
      user,
    });
  }),

  /** sign out */
  rest.post(`${MOCK_API_URL}/auth/signout`, (req, res, ctx) => {
    const accessToken = parseAccessToken(req);
    if (!accessToken) {
      return createSuccessResponse(res, ctx, true);
    }

    removeToken(accessToken);
    return createSuccessResponse(res, ctx, true);
  }),

  /** sign up */
  rest.post(`${MOCK_API_URL}/auth/signup`, (req, res, ctx) => {
    const signUpInput: SignUpInput = req.body as SignUpInput;

    const existingUser = getUserByEmail(signUpInput.email);
    if (existingUser) {
      return createErrorResponse(
        res,
        ctx,
        Unauthorized,
        'The user already exists'
      );
    }

    const userId = uuidv4();
    const accessToken = uuidv4();
    const newUser = { id: userId, ...signUpInput };
    createUser(newUser);
    setTokenValue(accessToken, newUser.id);

    const { password, ...user } = newUser;
    return createSuccessResponse(res, ctx, {
      accessToken,
      user,
    });
  }),

  /** get headlines */
  rest.get(`${MOCK_API_URL}/headlines`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getHeadlines()));
  }),

  /** get headline */
  rest.get(`${MOCK_API_URL}/headlines/:headlineId`, (req, res, ctx) => {
    const { headlineId } = req.params;
    const headline = getHeadline(headlineId);
    if (headline !== undefined) {
      return res(ctx.status(200), ctx.json(headline));
    } else {
      return createErrorResponse(res, ctx, NotFound, 'Headline does not exist');
    }
  }),

  /** create a headline */
  rest.post(`${MOCK_API_URL}/headlines`, (req, res, ctx) => {
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
    createHeadline(headline);
    return res(ctx.delay(500), ctx.status(Created), ctx.json({ headline }));
  }),

  /** update a headline */
  rest.put(`${MOCK_API_URL}/headlines/:headlineId`, (req, res, ctx) => {
    const accessToken = parseAccessToken(req);
    if (!accessToken) {
      return createErrorResponse(
        res,
        ctx,
        Forbidden,
        "You don't have permission to update headlines"
      );
    }

    const updatedHeadline: Headline = req.body as Headline;
    try {
      updateHeadline(updatedHeadline);
      return res(ctx.status(200), ctx.json(updateHeadline));
    } catch (e) {
      return createErrorResponse(
        res,
        ctx,
        NotFound,
        e instanceof Error ? e.message : 'Unknown error'
      );
    }
  }),

  /** get standings */
  rest.get(`${MOCK_API_URL}/standings`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getStandings()));
  }),
];
