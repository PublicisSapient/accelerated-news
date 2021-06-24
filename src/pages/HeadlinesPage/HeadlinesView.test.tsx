import React from 'react';
import { render } from '@testing-library/react';
import { mockHeadlines } from '../../mocks/mockHeadlines';
import { HeadlinesView } from './HeadlinesView';

describe('<HeadlinesView />', () => {
  test('renders correctly', () => {
    const { getAllByTestId } = render(
      <HeadlinesView headlines={mockHeadlines} />
    );

    // Verify that the correct number of headlines are rendered
    const headlineElements = getAllByTestId('headline');
    expect(headlineElements.length).toBe(mockHeadlines.length);

    // Verify that headlines are rendered correctly
    const headline = mockHeadlines[0];
    const headlineChildren = headlineElements[0].children;
    expect(headlineChildren[0]).toHaveTextContent(headline.title);
    expect(headlineChildren[1]).toHaveTextContent(headline.attribution);
    expect(headlineChildren[2]).toHaveTextContent(headline.teaser);
  });
});
