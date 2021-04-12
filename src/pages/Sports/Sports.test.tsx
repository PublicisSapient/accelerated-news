import React from 'react';
import { render } from '../../test/test-utils';
import { Sports } from './Sports';

// Set API_URL in window environment
(window as any)._env_ = {
  API_URL: 'http://localhost:8080',
};

describe('<Sports />', () => {
  test('renders correctly', async () => {
    const { findAllByTestId } = render(<Sports />);

    // expect 4 standings
    const standings = await findAllByTestId('standing');
    expect(standings.length).toBe(4);
  });
});
