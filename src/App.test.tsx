import React from 'react';
import { App } from './App';
import { HeadlinesPage, NotFoundPage } from './pages';
import { render, screen } from './test/test-utils';

jest.mock('./pages/HeadlinesPage/HeadlinesPage');
jest.mock('./pages/NotFoundPage/NotFoundPage');

describe('<App />', () => {
  test('renders the Home page on default route', () => {
    // Arrange
    (HeadlinesPage as jest.Mock).mockImplementation(() => (
      <div>HeadlinesPageMock</div>
    ));

    // Act
    render(<App />);

    // Assert
    expect(screen.getByText('HeadlinesPageMock')).toBeTruthy();
  });

  test('renders the Not Found page for an invalid route', () => {
    // Arrange
    (NotFoundPage as jest.Mock).mockImplementation(() => (
      <div>NotFoundMock</div>
    ));

    // Act
    render(<App />, { initialRoute: '/invalid/route' });

    // Assert
    expect(screen.getByText('NotFoundMock')).toBeTruthy();
  });
});
