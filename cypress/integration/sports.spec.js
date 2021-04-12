describe('Sports page', function () {
  it('renders correctly', function () {
    // Go to sports page
    cy.visit('/sports');

    // Verify that 4 standings are rendered
    const standings = cy.get('[data-testid="standing"]');
    standings.should('have.length', 4);
  });
});
