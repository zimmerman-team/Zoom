describe('Chartbuilder line chart fragment e2e', function() {
  it('Should contain /linechart/ in the url', function() {
    cy.log('**Signs in and and navigates to linechart**');
    cy.signIn();
    cy.navigateToCreateLinechart();

    cy.log('**URL is correct**');
    cy.url().should('include', '/visualizer/linechart');

    cy.log('**Plots aids related deaths**');
    cy.get(
      '[class*=ExpansionPanelContainer]:nth-child(4) [data-cy="zoom-select"]'
    )
      .first()
      .click();
    cy.contains('aids related deaths (unaids)').click();
    cy.get('body').click();
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

    cy.log('**Hovering over chart displays correct content**');
    cy.wait(4000);
    cy.waitPageLoader();
    cy.get('.recharts-surface')
      .scrollIntoView()
      .trigger('mouseover', { force: true });

    cy.contains('Year: 2005');
    cy.contains(
      'aids related deaths (unaids) - adolescents (10 to 19) realistic estimate'
    );
  });

  it('Should make a snapshot of the visual current state', function() {
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.wait(15000);
    cy.percySnapshot('Chartbuilder - Linechart');
  });
});
