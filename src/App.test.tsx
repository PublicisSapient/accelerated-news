import React from 'react';
import { render } from '@testing-library/react';
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
    const { getByText } = render(
      <AuthContextProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </AuthContextProvider>
    );

    // Assert
    expect(getByText('HeadlinesPageMock')).toBeTruthy();
  });

  test('renders the Not Found page for an invalid route', () => {
    // Arrange
    (NotFoundPage as jest.Mock).mockImplementation(() => (
      <div>NotFoundMock</div>
    ));

    // Act
    const { getByText } = render(
      <AuthContextProvider>
        <MemoryRouter initialEntries={['/invalid/route']}>
          <App />
        </MemoryRouter>
      </AuthContextProvider>
    );

    // Assert
    expect(getByText('NotFoundMock')).toBeTruthy();
  });
});
