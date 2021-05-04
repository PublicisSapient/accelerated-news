const headline = {
  title: 'Amazon posts second straight quarter of more than $100B in revenue',
  attribution: 'USA Today, April 29, 2021',
  teaser:
    'Amazon shoppers bought more products and streamed more video during the first three months of the year, propelling the online retailing giant to first-quarter sales of $108.5 billion.',
};

describe('Manage Headlines page', function () {
  it('renders headlines in master component', function () {
    cy.signupJohnSmith();

    // Go to manage headlines page
    cy.contains('Manage Headlines').click();

    // Verify that 4 headlines are rendered in the master component
    const headlines = cy.get('[data-testid="headline-card"]');
    headlines.should('have.length', 4);
  });

  it('allows adding new headlines', function () {
    cy.signupJohnSmith();

    // Go to manage headlines page
    cy.contains('Manage Headlines').click();

    // Add a headline
    cy.get('textarea[name="title"]').type(headline.title);
    cy.get('input[name="attribution"]').type(headline.attribution);
    cy.get('textarea[name="teaser"]').type(headline.teaser);
    cy.get('[data-testid="submit-button"]').click();

    // Verify that 5 headlines are rendered in the master component
    const headlines = cy.get('[data-testid="headline-card"]');
    headlines.should('have.length', 5);

    // Verify the title of the 5th headline
    headlines.eq(4).should('have.text', headline.title);
  });

  it('allows updating of headlines', function () {
    cy.signupJohnSmith();

    // Go to manage headlines page
    cy.contains('Manage Headlines').click();

    // Click on 2nd headline
    let headlines = cy.get('[data-testid="headline-card"]');
    headlines.eq(1).click();

    // Edit the headline
    cy.get('textarea[name="title"]').clear().type('New Headline');
    cy.get('[data-testid="submit-button"]').click();

    // Verify that 4 headlines are rendered in the master component
    headlines = cy.get('[data-testid="headline-card"]');
    headlines.should('have.length', 4);

    // Verify the title of the 2nd headline
    headlines.eq(1).should('have.text', 'New Headline');
  });
});
