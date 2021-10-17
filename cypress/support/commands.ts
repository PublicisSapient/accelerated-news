// Must be declared global to be detected by typescript (allows import/export)
// eslint-disable @typescript/interface-name
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to signup to Bullsfirst.
       * @example cy.signup('John Smith', 'jsmith@example.com', 'let-me-in')
       */
      signup(name: string, email: string, password: string): Chainable<Element>;

      /**
       * Custom command to signup as John Smith.
       * @example cy.signupJohnSmith()
       */
      signupJohnSmith(): Chainable<Element>;
    }
  }
}

Cypress.Commands.add('signup', (name, email, password) => {
  cy.visit('/signup');
  cy.get('input[name="name"]').type(name);
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('input[name="confirmPassword"]').type(password);
  cy.contains('Sign up').click();
});

Cypress.Commands.add('signupJohnSmith', () => {
  cy.signup('John Smith', 'jsmith@example.com', 'let-me-in');
});

// Convert this to a module instead of script (allows import/export)
export {};
