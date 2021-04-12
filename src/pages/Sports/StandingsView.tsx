import React from 'react';
import { TeamStanding } from '../../models/';

export interface StandingsViewProps {
  standings: Array<TeamStanding>;
}

export const StandingsView = ({ standings }: StandingsViewProps) => {
  return (
    <table className="striped">
      <thead>
        <tr>
          <th>Team</th>
          <th className="text-right">Wins</th>
          <th className="text-right">Losses</th>
          <th className="text-right">Pct</th>
        </tr>
      </thead>
      <tbody>
        {standings.map((standing) => (
          <tr key={standing.team} data-testid="standing">
            <td>{standing.team}</td>
            <td className="text-right">{standing.wins}</td>
            <td className="text-right">{standing.losses}</td>
            <td className="text-right">{standing.pct}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
