import axios from 'axios';
import { QueryFunctionContext, useMutation, useQuery } from 'react-query';
import { Headline } from '../models';

// ---------- fetchHeadlines ----------
const fetchHeadlines = async (): Promise<Array<Headline>> => {
  const resp = await axios.get('/headlines');
  return resp.data;
};

export const useHeadlinesQuery = () => {
  return useQuery('headlines', fetchHeadlines);
};

// ---------- fetchHeadline ----------
type HeadlineQueryKey = readonly ['headline', string];

const fetchHeadline = async ({
  queryKey,
}: QueryFunctionContext<HeadlineQueryKey>): Promise<Headline> => {
  const [, headlineId] = queryKey;
  const resp = await axios.get(`/headlines/${headlineId}`);
  return resp.data;
};

export const useHeadlineQuery = (headlineId: string) => {
  return useQuery(['headline', headlineId], fetchHeadline);
};

// ---------- createHeadline ----------
export const useHeadlineCreate = () => {
  return useMutation(
    async (headline: Headline) => await axios.post('/headlines', headline)
  );
};

// ---------- updateHeadline ----------
export const useHeadlineUpdate = () => {
  return useMutation(
    async (headline: Headline) =>
      await axios.put(`/headlines/${headline.id}`, headline)
  );
};
