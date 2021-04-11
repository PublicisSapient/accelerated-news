import { rest } from 'msw';
import { mockHeadlines } from './mockHeadlines';

const API_URL = 'http://localhost:8080';

export const handlers = [
  rest.get(`${API_URL}/headlines`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockHeadlines));
  }),
];
