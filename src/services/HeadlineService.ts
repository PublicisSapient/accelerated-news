import { formatHttpError } from '@http-utils/core';
import axios from 'axios';
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { Headline } from '../models';

// ---------- fetchHeadlines ----------
export const fetchHeadlines = async (): Promise<Array<Headline>> => {
  try {
    const resp = await axios.get('/headlines');
    return resp.data as Array<Headline>;
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

export const useHeadlinesQuery = () => {
  return useQuery('headlines', fetchHeadlines);
};

// ---------- fetchHeadline ----------
type HeadlineQueryKey = readonly ['headline', string];

export const fetchHeadline = async ({
  queryKey,
}: QueryFunctionContext<HeadlineQueryKey>): Promise<Headline> => {
  try {
    const [, headlineId] = queryKey;
    const resp = await axios.get(`/headlines/${headlineId}`);
    return resp.data as Headline;
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

export const useHeadlineQuery = (headlineId: string) => {
  return useQuery(['headline', headlineId], fetchHeadline);
};

// ---------- createHeadline ----------
export const createHeadline = async (headline: Headline) => {
  try {
    const resp = await axios.post('/headlines', headline);
    return resp.data;
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

export const useHeadlineCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(createHeadline, {
    onSuccess: () => {
      // refetch headlines on success
      queryClient.invalidateQueries('headlines');
    },
  });
};

// ---------- updateHeadline ----------
export const updateHeadline = async (headline: Headline) => {
  try {
    const resp = await axios.put(`/headlines/${headline.id}`, headline);
    return resp.data;
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

export const useHeadlineUpdate = (headLineId: string) => {
  const queryClient = useQueryClient();

  return useMutation(updateHeadline, {
    onSuccess: () => {
      // refetch headlines on success
      queryClient.invalidateQueries('headlines');
      queryClient.invalidateQueries(['headline', headLineId]);
    },
  });
};
