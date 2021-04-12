import axios from 'axios';
import { useQuery } from 'react-query';
import { TeamStanding } from './TeamStanding';

/**
 * Fetches standings from the server
 */
const fetchStandings = async (): Promise<Array<TeamStanding>> => {
  const resp = await axios.get('/standings');
  return resp.data;
};

/**
 * Hook to fetch standings
 */
export const useStandings = () => {
  return useQuery<Array<TeamStanding>, Error>('standings', fetchStandings, {
    refetchOnWindowFocus: false,
  });
};
