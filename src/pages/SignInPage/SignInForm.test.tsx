import React from 'react';
import { render, screen, userEvent, waitFor } from '../../test/test-utils';
import { SignInForm } from './SignInForm';

const handleSubmit = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
});

describe('<SignInForm />', () => {
  test('displays validation error if email is not entered', async () => {
    render(<SignInForm onSubmit={handleSubmit} />);

    // Submit form without entering email
    userEvent.click(screen.getByText('Sign in'));

    // Expect to see a validation error
    expect(await screen.findByText('email is a required field')).toBeTruthy();
  });

  test('displays validation error if email format is not correct', async () => {
    render(<SignInForm onSubmit={handleSubmit} />);

    // Submit form with incorrect email format
    userEvent.type(screen.getByLabelText('Email'), 'johnsmith');
    userEvent.click(screen.getByText('Sign in'));

    // Expect to see a validation error
    expect(await screen.findByText('email must be a valid email')).toBeTruthy();
  });

  test('displays validation error if password is not entered', async () => {
    render(<SignInForm onSubmit={handleSubmit} />);

    // Submit form without entering password
    userEvent.click(screen.getByText('Sign in'));

    // Expect to see a validation error
    expect(
      await screen.findByText('password is a required field')
    ).toBeTruthy();
  });

  test('submits credentials if all validations pass', async () => {
    render(<SignInForm onSubmit={handleSubmit} />);

    // Enter valid credentials and submit form
    userEvent.type(screen.getByLabelText('Email'), 'johnsmith@gmail.com');
    userEvent.type(screen.getByLabelText('Password'), 'let-me-in');
    userEvent.click(screen.getByText('Sign in'));

    // Expect handleSubmit to be called with the entered credentials
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
    expect(handleSubmit).toHaveBeenCalledWith(
      {
        email: 'johnsmith@gmail.com',
        password: 'let-me-in',
      },
      // ignore the event that is sent to handleSubmit
      expect.anything()
    );
  });

  test('displays signin error', async () => {
    render(
      <SignInForm signInError="Unauthorized user" onSubmit={handleSubmit} />
    );

    // Expect to see the signin error
    expect(screen.getByText('Unauthorized user')).toBeTruthy();
  });
});
