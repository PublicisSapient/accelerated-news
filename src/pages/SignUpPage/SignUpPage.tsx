import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ViewVerticalContainer } from '../../components';
import { useAuthContext } from '../../contexts';
import { AuthService } from '../../services';
import { SignUpForm, FormEntity } from './SignUpForm';

export const SignUpPage = () => {
  const { authState, setAuthState } = useAuthContext();
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
  const handleSubmit = async (formEntity: FormEntity) => {
    const { confirmPassword, ...signUpInput } = formEntity;
    try {
      const user = await AuthService.signUp(signUpInput);
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
