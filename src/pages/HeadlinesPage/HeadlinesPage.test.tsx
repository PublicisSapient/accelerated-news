import React from 'react';
import { render, screen } from '../../test/test-utils';
import { HeadlinesPage } from './HeadlinesPage';

describe('<Headlines />', () => {
  test('renders correctly', async () => {
    render(<HeadlinesPage />);

    // expect 4 headlines
    const headlines = await screen.findAllByTestId('headline');
    expect(headlines.length).toBe(4);
  });
});
