describe('Chartbuilder country focus fragment e2e', function() {
  it('Should be able to plot Kenya specific data', function() {
    cy.log('**Signs in and navigates to Country Focus Kenya**');
    cy.signIn();
    cy.navigateToCountryFocusKenya();
    cy.url().should('include', '/visualizer/focusKE');

    cy.log('**It makes a Percy snapshot**');
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.percySnapshot('Chartbuilder - Kenya focus');

    cy.log('**Plots some Kenya specific data**');
    cy.get(
      '[class*=ExpansionPanelContainer]:nth-child(4) [data-cy="zoom-select"]'
    )
      .first()
      .click();
    cy.contains('aids related deaths (unaids)').click();

    cy.get('[data-cy="legendLayer-label"]').should(
      'contain',
      'aids related deaths (unaids)'
    );
  });

  it('Should be able to plot NL specific data', function() {
    cy.log('**Navigates to Country Focus NL**');
    cy.visit('/visualizer/focusNL/vizID/edit');
    cy.url().should('include', '/visualizer/focusNL');

    cy.log('**It makes a Percy snapshot**');
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.percySnapshot('Chartbuilder - Netherlands focus');

    cy.log('**Plots some NL specific data**');
    cy.get(
      '[class*=ExpansionPanelContainer]:nth-child(4) [data-cy="zoom-select"]'
    )
      .first()
      .click();
    cy.contains('condom use').click();

    cy.contains('men who have sex with men 25 plus').click();
    cy.get('[data-cy="legendLayer-label"]').should('contain', 'condom use');
  });
});
