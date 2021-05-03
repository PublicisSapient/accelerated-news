import React, { useEffect, useState } from 'react';
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

  // redirect if user is already logged in
  /* istanbul ignore next */
  useEffect(() => {
    if (authState.user) {
      navigate('/');
    }
  }, [authState.user, navigate]);

  /* istanbul ignore next */
  const handleSubmit = async (formUserInfo: FormUserInfo) => {
    const { confirmPassword, ...userInfo } = formUserInfo;
    try {
      const user = await AuthService.signUp(userInfo);
      // navigate before setting authState to avoid saving incorrect signInRedirect
      navigate('/');
      setAuthState({ ...authState, user });
    } catch (e) {
      setSignUpError(e.message);
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
