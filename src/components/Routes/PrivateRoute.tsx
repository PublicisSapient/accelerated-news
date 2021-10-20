import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts';
import { AuthService } from '../../services';

export interface PrivateRouteProps {
  redirectPath: string;
  element: ReactElement;
}

/* istanbul ignore next */
export const PrivateRoute = ({ redirectPath, element }: PrivateRouteProps) => {
  const { authState } = useAuthContext();
  const location = useLocation();

  // if user is logged in, simply render the specified element,
  // otherwise navigate to the redirect path
  if (authState.user) {
    return element;
  } else {
    AuthService.setSignInRedirectPath(location.pathname);
    return <Navigate to={redirectPath} />;
  }
};
