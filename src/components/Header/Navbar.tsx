import React, { Fragment } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthState, useAuthStateSetter } from '../../contexts';
import { AuthService } from '../../services';
import './Navbar.css';

export const Navbar = () => {
  const authState = useAuthState();
  const setAuthState = useAuthStateSetter();
  const navigate = useNavigate();
  const { user } = authState;

  /* istanbul ignore next */
  const handleSignIn = async () => {
    navigate('/signin');
  };

  /* istanbul ignore next */
  const handleSignOut = async () => {
    await AuthService.signOut();
    // navigate before setting authState to avoid saving incorrect signInRedirect
    navigate('/');
    setAuthState({ ...authState, user: undefined });
  };

  return (
    <nav className="navbar">
      <span className="navbar__brand mobile">News</span>
      <span className="navbar__brand desktop">Accelerated News</span>

      <ul className="flex-1">
        <li>
          <NavLink className="navbar__link" to="/" end>
            Headlines
          </NavLink>
        </li>
        <li>
          <NavLink className="navbar__link" to="/sports" end>
            Sports
          </NavLink>
        </li>
      </ul>

      {user === undefined ? (
        <button
          className="navbar__signin btn-sm"
          aria-label="Sign in"
          onClick={handleSignIn}
        >
          Sign in
        </button>
      ) : null}

      {user !== undefined ? (
        <Fragment>
          <div className="navbar__username">{user.displayName}</div>
          <FaSignOutAlt
            className="navbar__signout"
            aria-labelledby="Sign out"
            onClick={handleSignOut}
          />
        </Fragment>
      ) : null}
    </nav>
  );
};
