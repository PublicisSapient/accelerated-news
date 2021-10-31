import React from 'react';
import { mockStandings } from '../../mocks/mockStandings';
import { render, screen } from '../../test/test-utils';
import { StandingsView } from './StandingsView';

describe('<StandingsView />', () => {
  test('renders correctly', () => {
    render(<StandingsView standings={mockStandings} />);

    // Verify that the correct number of rows are rendered
    const rows = screen.getAllByTestId('standing');
    expect(rows.length).toBe(mockStandings.length);

    // Verify that standings are rendered correctly
    const row = rows[0];
    const standing = mockStandings[0];
    expect(row.firstChild).toHaveTextContent(standing.team);
  });
});
