import React from 'react';
import { render } from '../../test/test-utils';
import { HeadlinesPage } from './HeadlinesPage';

describe('<Headlines />', () => {
  test('renders correctly', async () => {
    const { findAllByTestId } = render(<HeadlinesPage />);

    // expect 4 headlines
    const headlines = await findAllByTestId('headline');
    expect(headlines.length).toBe(4);
  });
});
