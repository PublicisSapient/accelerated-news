import React from 'react';
import { mockHeadlines } from '../../mocks/mockHeadlines';
import { render, screen } from '../../test/test-utils';
import { HeadlinesView } from './HeadlinesView';

describe('<HeadlinesView />', () => {
  test('renders correctly', () => {
    render(<HeadlinesView headlines={mockHeadlines} />);

    // Verify that the correct number of headlines are rendered
    const headlineElements = screen.getAllByTestId('headline');
    expect(headlineElements.length).toBe(mockHeadlines.length);

    // Verify that headlines are rendered correctly
    const headline = mockHeadlines[0];
    const headlineChildren = headlineElements[0].children;
    expect(headlineChildren[0]).toHaveTextContent(headline.title);
    expect(headlineChildren[1]).toHaveTextContent(headline.attribution);
    expect(headlineChildren[2]).toHaveTextContent(headline.teaser);
  });
});
