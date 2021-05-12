import React, { useContext, useState } from 'react';
import { AuthState } from './AuthState';

// ---------- AuthContext ----------
type AuthStateSetter = (authState: AuthState) => void;

const AuthContext = React.createContext<AuthState | undefined>(undefined);
const AuthSetterContext =
  React.createContext<AuthStateSetter | undefined>(undefined);

// ---------- Hooks ----------
function useAuthState(): AuthState {
  const authState = useContext(AuthContext);
  /* istanbul ignore next */
  if (authState === undefined) {
    throw new Error('useAuthState must be used within a AuthContextProvider');
  }
  return authState;
}

function useAuthStateSetter(): AuthStateSetter {
  const setAuthState = useContext(AuthSetterContext);
  /* istanbul ignore next */
  if (setAuthState === undefined) {
    throw new Error(
      'useAuthStateSetter must be used within a AuthContextProvider'
    );
  }
  return setAuthState;
}

// ---------- AuthContextProvider ----------
const AuthContextProvider: React.FC = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({});

  return (
    <AuthContext.Provider value={authState}>
      <AuthSetterContext.Provider value={setAuthState}>
        {children}
      </AuthSetterContext.Provider>
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, useAuthState, useAuthStateSetter };
