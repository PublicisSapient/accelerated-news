import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import { AuthContextProvider } from './contexts';
import { HeadlinesPage, NotFoundPage } from './pages';

jest.mock('./pages/HeadlinesPage/HeadlinesPage');
jest.mock('./pages/NotFoundPage/NotFoundPage');

describe('<App />', () => {
  test('renders the Home page on default route', () => {
    // Arrange
    (HeadlinesPage as jest.Mock).mockImplementation(() => (
      <div>HeadlinesPageMock</div>
    ));

    // Act
    render(
      <AuthContextProvider>
        <Router>
          <App />
        </Router>
      </AuthContextProvider>
    );

    // Assert
    expect(screen.getByText('HeadlinesPageMock')).toBeTruthy();
  });

  test('renders the Not Found page for an invalid route', () => {
    // Arrange
    (NotFoundPage as jest.Mock).mockImplementation(() => (
      <div>NotFoundMock</div>
    ));

    window.history.pushState({}, 'Invalid Page', '/invalid/route')

    // Act
    render(
      <AuthContextProvider>
        <Router>
          <App />
        </Router>
      </AuthContextProvider>
    );

    // Assert
    expect(screen.getByText('NotFoundMock')).toBeTruthy();
  });
});
