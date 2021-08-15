import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, waitFor } from '../../test/test-utils';
import { SignInForm } from './SignInForm';

const handleSubmit = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
});

describe('<SignInForm />', () => {
  test('displays validation error if email is not entered', async () => {
    const { findByText, getByText } = render(
      <SignInForm onSubmit={handleSubmit} />
    );

    // Submit form without entering email
    userEvent.click(getByText('Sign in'));

    // Expect to see a validation error
    expect(await findByText('email is a required field')).toBeTruthy();
  });

  test('displays validation error if email format is not correct', async () => {
    const { findByText, getByLabelText, getByText } = render(
      <SignInForm onSubmit={handleSubmit} />
    );

    // Submit form with incorrect email format
    userEvent.type(getByLabelText('Email'), 'johnsmith');
    userEvent.click(getByText('Sign in'));

    // Expect to see a validation error
    expect(await findByText('email must be a valid email')).toBeTruthy();
  });

  test('displays validation error if password is not entered', async () => {
    const { findByText, getByText } = render(
      <SignInForm onSubmit={handleSubmit} />
    );

    // Submit form without entering password
    userEvent.click(getByText('Sign in'));

    // Expect to see a validation error
    expect(await findByText('password is a required field')).toBeTruthy();
  });

  test('submits credentials if all validations pass', async () => {
    const { getByLabelText, getByText } = render(
      <SignInForm onSubmit={handleSubmit} />
    );

    // Enter valid credentials and submit form
    userEvent.type(getByLabelText('Email'), 'johnsmith@gmail.com');
    userEvent.type(getByLabelText('Password'), 'let-me-in');
    userEvent.click(getByText('Sign in'));

    // Expect handleSubmit to be called with the entered credentials
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
    expect(handleSubmit).toHaveBeenCalledWith(
      {
        email: 'johnsmith@gmail.com',
        password: 'let-me-in',
      },
      expect.anything()
    );
  });

  test('displays signin error', async () => {
    const { getByText } = render(
      <SignInForm signInError="Unauthorized user" onSubmit={handleSubmit} />
    );

    // Expect to see the signin error
    expect(getByText('Unauthorized user')).toBeTruthy();
  });
});
