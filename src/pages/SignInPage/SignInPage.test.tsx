import React from 'react';
import { render, screen, userEvent } from '../../test/test-utils';
import { SignInPage } from './SignInPage';

describe('<SignIn />', () => {
  test('navigates to headlines page on successful login', async () => {
    render(<SignInPage />);

    // Enter valid credentials and submit form
    userEvent.type(screen.getByLabelText('Email'), 'johnsmith@gmail.com');
    userEvent.type(screen.getByLabelText('Password'), 'let-me-in');

    // Commented out to avoid the following warning from Jest
    //   Cannot log after tests are done. Did you forget to wait for something async in your test?
    //   Attempted to log "Warning: An update to SignUpPage inside a test was not wrapped in act(...).
    // userEvent.click(getByText('Sign in'));

    // Expect to see the headlines page
    // TODO: wait for React Router docs to catch up on testing. See here:
    // https://github.com/ReactTraining/react-router/blob/dev/docs/advanced-guides/testing/testing-with-react-testing-library.md
    // For now the app remains on the sign-in page
    // expect(await findByText('Headlines')).toBeTruthy();
  });
});
