import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { App } from './App';
import { Headlines, NotFound } from './pages';

jest.mock('./pages/Headlines/Headlines');
jest.mock('./pages/NotFound/NotFound');

describe('<App />', () => {
  test('renders the Home page on default route', () => {
    // Arrange
    (Headlines as jest.Mock).mockImplementation(() => (
      <div>HeadlinesPageMock</div>
    ));

    // Act
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Assert
    expect(getByText('HeadlinesPageMock')).toBeTruthy();
  });

  test('renders the Not Found page for an invalid route', () => {
    // Arrange
    (NotFound as jest.Mock).mockImplementation(() => <div>NotFoundMock</div>);

    // Act
    const { getByText } = render(
      <MemoryRouter initialEntries={['/invalid/route']}>
        <App />
      </MemoryRouter>
    );

    // Assert
    expect(getByText('NotFoundMock')).toBeTruthy();
  });
});
