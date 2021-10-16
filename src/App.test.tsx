import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
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
        <MemoryRouter>
          <App />
        </MemoryRouter>
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

    // Act
    render(
      <AuthContextProvider>
        <MemoryRouter initialEntries={['/invalid/route']}>
          <App />
        </MemoryRouter>
      </AuthContextProvider>
    );

    // Assert
    expect(screen.getByText('NotFoundMock')).toBeTruthy();
  });
});
