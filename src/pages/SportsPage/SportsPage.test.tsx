import React from 'react';
import { render, screen } from '../../test/test-utils';
import { SportsPage } from './SportsPage';

describe('<Sports />', () => {
  test('renders correctly', async () => {
    render(<SportsPage />);

    // expect 4 standings
    const standings = await screen.findAllByTestId('standing');
    expect(standings.length).toBe(4);
  });
});
