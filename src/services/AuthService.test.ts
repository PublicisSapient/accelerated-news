import { Credentials, User, UserInfo } from '../models';
import { AuthService } from './AuthService';

// Set username in window environment
(window as any)._env_ = {
  API_URL: 'http://localhost:8080',
};

const userInfo: UserInfo = {
  displayName: 'John Smith',
  email: 'jsmith@example.com',
  password: 'let-me-in',
};

const user: User = {
  displayName: 'John Smith',
  email: 'jsmith@example.com',
};

const credentials: Credentials = {
  email: 'jsmith@example.com',
  password: 'let-me-in',
};

const signInRedirectPath = '/manage/headlines';

describe('AuthService', () => {
  it('allows user to sign up, sign out and sign in', async () => {
    const actualUser1 = await AuthService.signUp(userInfo);
    expect(actualUser1).toEqual(user);

    const actualUser2 = await AuthService.fetchUser();
    expect(actualUser2).toEqual(user);

    const result = await AuthService.signOut();
    expect(result).toBe(true);

    const actualUser3 = await AuthService.fetchUser();
    expect(actualUser3).toBeUndefined();

    const actualUser4 = await AuthService.signIn(credentials);
    expect(actualUser4).toEqual(user);
  });

  it('allows to manage sign in redirect path', async () => {
    AuthService.setSignInRedirectPath(signInRedirectPath);
    expect(AuthService.getSignInRedirectPath()).toEqual(signInRedirectPath);

    AuthService.removeSignInRedirectPath();
    expect(AuthService.getSignInRedirectPath()).toEqual('/');
  });
});
