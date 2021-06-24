import axios from 'axios';
import { useQuery } from 'react-query';
import { TeamStanding } from './TeamStanding';

// ---------- fetchStandings ----------
const fetchStandings = async (): Promise<Array<TeamStanding>> => {
  const resp = await axios.get('/standings');
  return resp.data;
};

export const useStandingsQuery = () => {
  return useQuery<Array<TeamStanding>>('standings', fetchStandings);
};
