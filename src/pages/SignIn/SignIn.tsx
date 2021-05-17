import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ViewVerticalContainer } from '../../components';
import { useAuthState, useAuthStateSetter } from '../../contexts';
import { Credentials } from '../../models';
import { AuthService } from '../../services';
import { SignInForm } from './SignInForm';

export const SignIn = () => {
  const authState = useAuthState();
  const setAuthState = useAuthStateSetter();
  const navigate = useNavigate();
  const [signInError, setSignInError] = useState<string | undefined>(undefined);

  /* istanbul ignore next */
  const navigateToSignInRedirect = useCallback(() => {
    navigate(AuthService.getSignInRedirectPath());
    AuthService.removeSignInRedirectPath();
  }, [navigate]);

  // redirect if user is already logged in
  /* istanbul ignore next */
  useEffect(() => {
    if (authState.user) {
      navigateToSignInRedirect();
    }
  }, [authState.user, navigateToSignInRedirect]);

  /* istanbul ignore next */
  const handleSubmit = async (credentials: Credentials) => {
    try {
      const user = await AuthService.signIn(credentials);
      setAuthState({ ...authState, user });
      navigateToSignInRedirect();
    } catch (e) {
      setSignInError(e.message);
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
