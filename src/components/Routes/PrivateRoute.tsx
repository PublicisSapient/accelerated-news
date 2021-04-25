import React from 'react';
import { RouteProps } from 'react-router';
import { Route, Navigate } from 'react-router-dom';
import { useAuthState } from '../../contexts';
import { AuthService } from '../../services';

export interface PrivateRouteProps extends RouteProps {
  redirectPath: string;
}

/* istanbul ignore next */
export const PrivateRoute = ({ redirectPath, ...props }: PrivateRouteProps) => {
  const { user } = useAuthState();

  if (!user) {
    AuthService.setSignInRedirectPath(props.path || '/');
    return <Navigate to={redirectPath} />;
  }
  return <Route {...props} />;
};
