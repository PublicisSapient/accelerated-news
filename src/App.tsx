import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './components';
import { useAuthContext } from './contexts';
import {
  HeadlinesPage,
  ManageHeadlinesPage,
  NotFoundPage,
  SignInPage,
  SignUpPage,
  SportsPage,
} from './pages';
import { AuthService } from './services';

export const App = () => {
  const { authState, setAuthState } = useAuthContext();

  // fetch user information on startup
  useEffect(() => {
    const fetchUser = async () => {
      if (!authState.user && AuthService.getAccessToken()) {
        const user = await AuthService.fetchUser();
        if (user) {
          setAuthState({ ...authState, user });
        }
      }
    };

    fetchUser();
  }, [authState, setAuthState]);

  return (
    <Routes>
      <Route path="/" element={<HeadlinesPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/sports" element={<SportsPage />} />
      <Route
        path="/manage/headlines"
        element={
          <PrivateRoute
            redirectPath="/signin"
            element={<ManageHeadlinesPage />}
          />
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
