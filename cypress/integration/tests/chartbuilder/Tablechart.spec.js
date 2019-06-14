beforeEach(() => {
  // README keep in mind that Cypress clears the whole state before each test. => signIn() before each test.
  // set this for skipping landing dialog
  cy.setCookie('cookieNotice', 'false');
});

describe('Chartbuilder table chart fragment e2e', function() {
  it('Should contain /tablechart in the url and map aids related deaths data', function() {
    cy.signIn();
    cy.navigateToTablechart();
    cy.waitPageLoader2();
    cy.waitPageLoader();
    cy.url().should('include', '/visualizer/tablechart');

    cy.get('[data-cy="year-2005"]').click();
    //Here we wait till the indicators have loaded.
    cy.wait(2000);
    cy.get(
      '[class*=ExpansionPanelContainer]:nth-child(4) [data-cy="zoom-select"]'
    )
      .first()
      .click();

    cy.contains('aids related deaths (unaids)').click();
    cy.waitPageLoader();
    cy.get('#MUIDataTableBodyRow-2 > :nth-child(5)').should('contain', '2005');
    cy.get('#MUIDataTableBodyRow-2 > :nth-child(9)').should(
      'contain',
      'aids related deaths (unaids)'
    );
  });

  it('Should make a snapshot of the visual current state', function() {
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.wait(2000);
    cy.percySnapshot('Chartbuilder - Tablechart');
  });

  it('Should sort on Geolocation', function() {
    cy.get(
      ':nth-child(2) > .MUIDataTableHeadCell-toolButton > .MUIDataTableHeadCell-data'
    ).click();
    cy.waitPageLoader();
    // cy.get('tbody>tr').should('contain', 'tonga'); fixme
  });

  it('Should only display Kenya data when searching "kenya"', function() {
    cy.get('[aria-label="Search"]').click();
    cy.get('.MuiInputBase-root > .MuiInputBase-input').type('kenya');
    cy.waitPageLoader();
    cy.get('tbody>tr').should('contain', 'kenya');
  });

  it('Should be able to delete Kenya data from table', function() {
    cy.get('tbody>tr').within(() => {
      cy.get('input[type="checkbox"]').click();
    });
    cy.get('[aria-label="Delete Selected Rows"]').click();
    cy.waitPageLoader();
    cy.get('tbody>tr').should('not.contain', 'Kenya');

    cy.get('[aria-label="Search"]').click();
    cy.get('.MUIDataTableSearch-main').within(() => {
      cy.get('[type="button"]').click();
    });
  });

  it('Resetting all values should populate data with No Data rows', function() {
    cy.get('[data-cy="data-explorer-panel-reset"]').click();
    cy.waitPageLoader();

    cy.get('tbody>tr').should('contain', 'No Data');
  });

  it('Should make a snapshot of the visual current state', function() {
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.wait(2000);
    cy.percySnapshot('Chartbuilder - Tablechart empty state');
  });
});
