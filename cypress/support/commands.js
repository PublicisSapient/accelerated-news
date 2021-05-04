Cypress.Commands.add('signup', (displayName, email, password) => {
  cy.visit('/signup');
  cy.get('input[name="displayName"]').type(displayName);
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('input[name="confirmPassword"]').type(password);
  cy.contains('Sign up').click();
});

Cypress.Commands.add('signupJohnSmith', (displayName, email, password) => {
  cy.signup('John Smith', 'jsmith@example.com', 'let-me-in');
});
