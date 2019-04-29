context('Country detail page', () => {
  let data;
  beforeEach(() => {
    cy.fixture('CountryDetailFixture.json').then(responseData => {
      data = responseData;
    });
  });
  it('Visit Country detail page', () => {
    cy.visit('/');
    cy.percySnapshot('Country detail');
    cy.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.get('[data-cy=sidebar-toggle]').click();
    cy.get('[data-cy=sidebar-country]').click();
    cy.wait(1000);
  });
  it('Check if Navigation text fields exist', () => {
    data.NavigationFields.map(name => {
      cy.get('[data-cy="navbar-country-detail"]').should('contain', name);
    });
  });
  it('Check if Section field texts exist', () => {
    data.NavigationFields.map(name => {
      cy.queryByText(name).should('exist');
    });
  });
});
