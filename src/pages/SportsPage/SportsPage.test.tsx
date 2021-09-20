import React from 'react';
import { render } from '../../test/test-utils';
import { SportsPage } from './SportsPage';

describe('<Sports />', () => {
  test('renders correctly', async () => {
    const { findAllByTestId } = render(<SportsPage />);

    // expect 4 standings
    const standings = await findAllByTestId('standing');
    expect(standings.length).toBe(4);
  });
});
