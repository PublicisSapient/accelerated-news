import React from 'react';
import { render, screen, userEvent, waitFor } from '../../test/test-utils';
import { SignUpForm } from './SignUpForm';

const handleSubmit = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
});

describe('<SignUpForm />', () => {
  test('displays validation errors if required fields are not entered', async () => {
    render(<SignUpForm onSubmit={handleSubmit} />);

    // Submit form without entering anything
    userEvent.click(screen.getByText('Sign up'));

    // Expect to see validation errors on required fields
    expect(await screen.findByText('name is a required field')).toBeTruthy();
    expect(await screen.findByText('email is a required field')).toBeTruthy();
    expect(
      await screen.findByText('password is a required field')
    ).toBeTruthy();
  });

  test("displays validation error if password and confirm password don't match", async () => {
    render(<SignUpForm onSubmit={handleSubmit} />);

    // Submit form with different password and confirm password
    userEvent.type(screen.getByLabelText('Password'), 'let-me-in');
    userEvent.type(screen.getByLabelText('Confirm Password'), 'let-me-out');
    userEvent.click(screen.getByText('Sign up'));

    // Expect to see a validation error
    expect(await screen.findByText('Passwords must match')).toBeTruthy();
  });

  test('submits user info if all validations pass', async () => {
    render(<SignUpForm onSubmit={handleSubmit} />);

    // Enter valid user info and submit form
    userEvent.type(screen.getByLabelText('Full Name'), 'John Smith');
    userEvent.type(screen.getByLabelText('Email'), 'johnsmith@gmail.com');
    userEvent.type(screen.getByLabelText('Password'), 'let-me-in');
    userEvent.type(screen.getByLabelText('Confirm Password'), 'let-me-in');
    userEvent.click(screen.getByText('Sign up'));

    // Expect handleSubmit to be called with user info
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
    expect(handleSubmit).toHaveBeenCalledWith(
      {
        name: 'John Smith',
        email: 'johnsmith@gmail.com',
        password: 'let-me-in',
        confirmPassword: 'let-me-in',
      },
      // ignore the event that is sent to handleSubmit
      expect.anything()
    );
  });

  test('displays signin error', async () => {
    render(
      <SignUpForm signUpError="User already exists" onSubmit={handleSubmit} />
    );

    // Expect to see the signup error
    expect(screen.getByText('User already exists')).toBeTruthy();
  });
});
