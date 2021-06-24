import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';
import { TextField } from '../../components';
import { SignUpInput } from '../../models';
import './SignUpForm.css';

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
});

export interface FormEntity extends SignUpInput {
  confirmPassword: string;
}

export interface SignUpFormProps {
  signUpError?: string;
  onSubmit: (formEntity: FormEntity) => void;
}

export const SignUpForm = ({ signUpError, onSubmit }: SignUpFormProps) => {
  const { formState, register, handleSubmit } = useForm<FormEntity>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  return (
    <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
      {signUpError !== undefined ? (
        <div className="text-error mb-3">{signUpError}</div>
      ) : null}

      <div className="mb-3">
        <TextField
          id="name"
          {...register('name')}
          label="Full Name"
          error={errors.name?.message}
        />
      </div>

      <div className="mb-3">
        <TextField
          id="email"
          {...register('email')}
          label="Email"
          error={errors.email?.message}
        />
      </div>

      <div className="mb-3">
        <TextField
          id="password"
          {...register('password')}
          label="Password"
          type="password"
          error={errors.password?.message}
        />
      </div>

      <div className="mb-5">
        <TextField
          id="confirm-password"
          {...register('confirmPassword')}
          label="Confirm Password"
          type="password"
          error={errors.confirmPassword?.message}
        />
      </div>

      <button className="btn-lg w-full mb-3" type="submit">
        Sign up
      </button>

      <NavLink className="signup-form__sign-in" to="/signin" end>
        Sign in
      </NavLink>
    </form>
  );
};
