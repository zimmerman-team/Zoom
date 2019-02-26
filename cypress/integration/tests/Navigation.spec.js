context('Navigation tests', () => {
  it('Goes from Home to Country detailpage through navigation bar', () => {
    cy.visit('/');
    cy.get('[data-cy=sidebar-toggle]').click();
    cy.get('[data-cy=sidebar-country]').click();
    cy.url().should('include', '/country/');
    cy.get('h2').should('contain', 'Zoom in on');
  });

  it('Goes into IATI detailpage through navigation bar', () => {
    cy.get('[data-cy=sidebar-toggle]').click();
    cy.get('[data-cy=sidebar-iati]').click();
  });

  it('Goes into Datamapper through navigation bar', () => {
    cy.get('[data-cy=sidebar-toggle]').click();
    cy.get('[data-cy=sidebar-datamapper]').click();
  });

  it('Goes into About ZOOM through navigation bar', () => {
    cy.get('[data-cy=sidebar-toggle]').click();
    cy.get('[data-cy=sidebar-about]').click();
  });
});
