Cypress.Commands.add('signup', (name, email, password) => {
  cy.visit('/signup');
  cy.get('input[name="name"]').type(name);
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('input[name="confirmPassword"]').type(password);
  cy.contains('Sign up').click();
});

Cypress.Commands.add('signupJohnSmith', (name, email, password) => {
  cy.signup('John Smith', 'jsmith@example.com', 'let-me-in');
});
