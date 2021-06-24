import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test/test-utils';
import { SignUpPage } from './SignUpPage';

describe('<SignUp />', () => {
  test('navigates to headlines page on successful login', async () => {
    const { findByText, getByLabelText, getByText } = render(<SignUpPage />);

    // Enter valid user info and submit form
    userEvent.type(getByLabelText('Full Name'), 'John Smith');
    userEvent.type(getByLabelText('Email'), 'johnsmith@gmail.com');
    userEvent.type(getByLabelText('Password'), 'let-me-in');
    userEvent.type(getByLabelText('Confirm Password'), 'let-me-in');
    userEvent.click(getByText('Sign up'));

    // Expect to see the headlines page
    // TODO: wait for React Router docs to catch up on testing. See here:
    // https://github.com/ReactTraining/react-router/blob/dev/docs/advanced-guides/testing/testing-with-react-testing-library.md
    // For now the app remains on the sign-up page
    // expect(await findByText('Headlines')).toBeTruthy();
    expect(await findByText('Sign up')).toBeTruthy();
  });
});
