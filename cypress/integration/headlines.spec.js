describe('Headlines page', function () {
  it('renders correctly', function () {
    // Go to home page
    cy.visit('/');

    // Verify that 4 headlines are rendered
    const headlines = cy.get('[data-testid="headline"]');
    headlines.should('have.length', 4);
  });
});
