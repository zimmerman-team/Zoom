beforeEach(() => {
  // README keep in mind that Cypress clears the whole state before each test. => signIn() before each test.
  // set this for skipping landing dialog
  cy.setCookie('cookieNotice', 'false');
});

describe('Chartbuilder bar chart fragment e2e', function() {
  it('Should contain /barchart in the url and map aids related deaths data', function() {
    cy.log('**Signs in and and navigates to barchart**');
    cy.signIn();
    cy.navigateToBarchart();

    cy.log('**URL is correct**');
    cy.url().should('include', '/visualizer/barchart');

    cy.log('**Plots aids related deaths**');
    cy.wait(6000);
    cy.get(
      '[class*=ExpansionPanelContainer]:nth-child(4) [data-cy="zoom-select"]'
    )
      .first()
      .click();
    cy.wait(2000);
    cy.contains('aids-related deaths').click();
    cy.waitPageLoader();
    cy.get('[data-cy="legend-label"]').should('have.css', 'content');

    cy.log('**Tooltip shows right content**');
    cy.get('[data-cy="tooltip-info-button"]')
      .scrollIntoView()
      .trigger('mouseenter', { force: true });
    cy.get('[data-cy="tooltip-content"]').should(
      'have.text',
      'Datasource: UNAIDS 2018'
    );

    cy.get('body').click();

    cy.log('**Graph structure mutations works on barchart**');
    cy.contains('Geolocation').click();
    cy.contains('Year').click();
    cy.wait(4000);
    cy.get('rect')
      .last()
      .scrollIntoView()
      .trigger('mouseover', { force: true });

    cy.contains('2005');
    cy.contains(
      'aids-related deaths - adolescents (10 to 19) realistic estimate: 10000'
    );
  });

  it('Should make a snapshot of the visual current state', function() {
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.wait(10000);
    cy.percySnapshot('Chartbuilder - Barchart');
  });
});
