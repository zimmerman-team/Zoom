beforeEach(() => {
  // README keep in mind that Cypress clears the whole state before each test. => signIn() before each test.
  // set this for skipping landing dialog
  cy.setCookie('cookieNotice', 'false');
});

describe('Chartbuilder line chart fragment e2e', function() {
  it('Should contain /linechart/ in the url', function() {
    cy.log('**Signs in and and navigates to linechart**');
    cy.signIn();
    cy.navigateToCreateLinechart();

    cy.log('**URL is correct**');
    cy.url().should('include', '/visualizer/linechart');

    cy.log('**Plots new hiv infections**');
    cy.get(
      '[class*=ExpansionPanelContainer]:nth-child(4) [data-cy="zoom-select"]'
    )
      .first()
      .click();
    cy.contains('new hiv infections').click();
    cy.get('body').click();
    cy.wait(10000);
    cy.waitPageLoader();
    cy.get('[data-cy="legend-label"]').should('have.css', 'content');

    cy.log('**Tooltip shows right content**');
    cy.get('[data-cy="tooltip-info-button"]')
      .scrollIntoView()
      .trigger('mouseenter', { force: true });
    cy.get('[data-cy="tooltip-content"]').should(
      'have.text',
      'Datasource: Public Indicators'
    );

    cy.log('**Hovering over chart displays correct content**');
    cy.wait(4000);
    cy.waitPageLoader();
    cy.get('.recharts-surface')
      .scrollIntoView()
      .trigger('mouseover', { force: true });

    cy.contains(
      'number of new hiv infections - adolescents (10 to 19) lower bound'
    );
  });

  it('Should make a snapshot of the visual current state', function() {
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.wait(10000);
    cy.percySnapshot('Chartbuilder - Linechart');
  });
});
