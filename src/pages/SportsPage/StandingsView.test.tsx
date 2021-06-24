import React from 'react';
import { render } from '@testing-library/react';
import { mockStandings } from '../../mocks/mockStandings';
import { StandingsView } from './StandingsView';

describe('<StandingsView />', () => {
  test('renders correctly', () => {
    const { getAllByTestId } = render(
      <StandingsView standings={mockStandings} />
    );

    // Verify that the correct number of rows are rendered
    const rows = getAllByTestId('standing');
    expect(rows.length).toBe(mockStandings.length);

    // Verify that standings are rendered correctly
    const row = rows[0];
    const standing = mockStandings[0];
    expect(row.firstChild).toHaveTextContent(standing.team);
  });
});
