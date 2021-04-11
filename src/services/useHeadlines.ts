import axios from 'axios';
import { useQuery } from 'react-query';
import { Headline } from '../models';

/**
 * Fetches headlines from the server
 */
const fetchHeadlines = async (): Promise<Array<Headline>> => {
  const resp = await axios.get('/headlines');
  return resp.data;
};

/**
 * Hook to fetch headlines
 */
export const useHeadlines = () => {
  return useQuery<Array<Headline>, Error>('headlines', fetchHeadlines, {
    refetchOnWindowFocus: false,
  });
};
