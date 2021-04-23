import React, { useState } from 'react';
import { formatHttpError } from '@http-utils/core';
import { useNavigate } from 'react-router-dom';
import { ViewVerticalContainer } from '../../components';
import { useAuthState, useAuthStateSetter } from '../../contexts';
import { Credentials } from '../../models';
import { SignInForm } from './SignInForm';
import { AuthService } from '../../services';

export const SignIn = () => {
  const authState = useAuthState();
  const setAuthState = useAuthStateSetter();
  const navigate = useNavigate();
  const [signInError, setSignInError] = useState<string | undefined>(undefined);

  const handleSubmit = async (credentials: Credentials) => {
    try {
      const user = await AuthService.signIn(credentials);
      setAuthState({ ...authState, user });
      navigate('/');
    } catch (e) {
      setSignInError(formatHttpError(e));
    }
  };

  return (
    <ViewVerticalContainer>
      <div className="flex-grow-1" />
      <SignInForm signInError={signInError} onSubmit={handleSubmit} />
      <div className="flex-grow-2" />
    </ViewVerticalContainer>
  );
};
