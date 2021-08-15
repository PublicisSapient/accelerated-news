import React from 'react';
import { render } from '../../test/test-utils';
import { HeadlinesPage } from './HeadlinesPage';

// Set API_URL in window environment
(window as any)._env_ = {
  API_URL: 'http://localhost:8080',
};

describe('<Headlines />', () => {
  test('renders correctly', async () => {
    const { findAllByTestId } = render(<HeadlinesPage />);

    // expect 4 headlines
    const headlines = await findAllByTestId('headline');
    expect(headlines.length).toBe(4);
  });
});