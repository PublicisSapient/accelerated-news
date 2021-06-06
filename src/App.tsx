import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './components';
import { useAuthContext } from './contexts';
import {
  Headlines,
  ManageHeadlines,
  NotFound,
  SignIn,
  SignUp,
  Sports,
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
      <Route path="/" element={<Headlines />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/sports" element={<Sports />} />
      <PrivateRoute
        path="/manage/headlines"
        redirectPath="/signin"
        element={<ManageHeadlines />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
