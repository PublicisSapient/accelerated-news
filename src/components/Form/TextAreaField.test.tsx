import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { render, screen, userEvent, waitFor } from '../../test/test-utils';
import { TextAreaField } from './TextAreaField';

// ---------- TestForm ----------
const schema = yup.object().shape({
  bio: yup.string().required(),
});

interface Person {
  bio: string;
}

interface TestFormProps {
  onSubmit: (person: Person) => void;
}

function TestForm({ onSubmit }: TestFormProps) {
  const { formState, register, handleSubmit } = useForm<Person>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextAreaField
        id="bio"
        {...register('bio')}
        label="Bio"
        error={errors.bio?.message}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

// ---------- Tests ----------
const handleSubmit = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
});

describe('<TextAreaField />', () => {
  test('displays a validation error if validation fails', async () => {
    render(<TestForm onSubmit={handleSubmit} />);

    // Submit form with bio not filled
    userEvent.click(screen.getByText('Submit'));

    // Expect to see a validation error
    expect(await screen.findByText('bio is a required field')).toBeTruthy();
  });

  test('submits form information if all validations pass', async () => {
    render(<TestForm onSubmit={handleSubmit} />);

    // Enter valid information and submit form
    userEvent.type(
      screen.getByLabelText('Bio'),
      'Front-end technologist and musician'
    );
    userEvent.click(screen.getByText('Submit'));

    // Expect handleSubmit to be called with the entered information
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
    expect(handleSubmit).toHaveBeenCalledWith(
      {
        bio: 'Front-end technologist and musician',
      },
      // ignore the event that is sent to handleSubmit
      expect.anything()
    );
  });
});
