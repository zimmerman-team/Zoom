context('Navigation tests', () => {
  it('Goes from Home to Country detailpage through navigation bar', () => {
    cy.viewport(1024, 768);
    cy.visit('/');
    // todo: So the flow should be that you plot some data on the map and
    //  then click on the country to open the next page,
    //  and check if that page loads correctly.
    // cy.get('[data-cy="geomap-filter-button"]').click();
    // cy.contains('Indicators').click();
    // cy.contains('Select indicator').click();
    // cy.contains('aaa test indicator').click();
    // cy.get('.overlays')
    //   .trigger('pointerdown', 672, 628)
    //   .trigger('pointerup', 672, 628)
    //   .trigger('mousedown', 672, 628)
    //   .click();

    cy.get('[data-cy=sidebar-toggle]').click();
    cy.get('[data-cy=sidebar-country]').click();
    cy.url().should('include', '/country');
    cy.get('h2').should('contain', 'Zoom in on');
  });

  it('Goes into IATI detailpage through navigation bar', () => {
    cy.get('[data-cy=sidebar-toggle]').click();
    cy.get('[data-cy=sidebar-iati]').click();
    cy.url().should('include', '/iati');
  });

  it('Goes into Datamapper through navigation bar', () => {
    cy.get('[data-cy=sidebar-toggle]').click();
    cy.get('[data-cy=sidebar-datamapper]').click();
    cy.url().should('include', '/mapper');
    cy.get('h2').should('contain', 'Describe meta data');
  });

  it('Goes into About ZOOM through navigation bar', () => {
    cy.get('[data-cy=sidebar-toggle]').click();
    cy.get('[data-cy=sidebar-about]').click();
    cy.url().should('include', '/about');
    cy.get('h2').should('contain', 'About zoom');
  });
});
