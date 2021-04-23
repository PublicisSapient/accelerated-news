const baseUrl = 'http://localhost:3000';

const user = {
  displayName: 'John Smith',
  email: 'jsmith@example.com',
  password: 'let-me-in',
};

describe('Authentication', function () {
  it('allows user to sign up, sign out and sign in', function () {
    // Go to home page
    cy.visit('/');

    // Click on sign in button
    cy.contains('Sign in').click();

    // Click on sign up button
    cy.contains('Sign up').click();

    // Fill out and submit the sign up form
    cy.get('input[name="displayName"]').type(user.displayName);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('input[name="confirmPassword"]').type(user.password);
    cy.contains('Sign up').click();

    // Verify navigation to headlines page and navbar showing user's name
    cy.url().should('eq', `${baseUrl}/`);
    cy.contains(user.displayName);

    // Sign out
    cy.get('svg[aria-labelledby="Sign out"]').click();

    // Sign in again
    cy.contains('Sign in').click();
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.contains('Sign in').click();

    // Verify navigation to headlines page and navbar showing user's name
    cy.url().should('eq', `${baseUrl}/`);
    cy.contains(user.displayName);
  });
});
