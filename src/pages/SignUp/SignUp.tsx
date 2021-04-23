import React, { useState } from 'react';
import { formatHttpError } from '@http-utils/core';
import { useNavigate } from 'react-router-dom';
import { ViewVerticalContainer } from '../../components';
import { useAuthState, useAuthStateSetter } from '../../contexts';
import { AuthService } from '../../services';
import { SignUpForm, FormUserInfo } from './SignUpForm';

export const SignUp = () => {
  const authState = useAuthState();
  const setAuthState = useAuthStateSetter();
  const navigate = useNavigate();
  const [signUpError, setSignUpError] = useState<string | undefined>(undefined);

  const handleSubmit = async (formUserInfo: FormUserInfo) => {
    const { confirmPassword, ...userInfo } = formUserInfo;
    try {
      const user = await AuthService.signUp(userInfo);
      setAuthState({ ...authState, user });
      navigate('/');
    } catch (e) {
      setSignUpError(formatHttpError(e));
    }
  };

  return (
    <ViewVerticalContainer>
      <div className="flex-grow-1" />
      <SignUpForm signUpError={signUpError} onSubmit={handleSubmit} />
      <div className="flex-grow-2" />
    </ViewVerticalContainer>
  );
};
