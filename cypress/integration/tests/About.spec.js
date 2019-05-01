describe('About page E2E test', function() {
  it('Visit about page', function() {
    cy.visit('/About');
  });

  it('Should make a snapshot of the visual current state', function() {
    cy.percySnapshot('About page');
  });

  it('Title should contain About zoom', function() {
    cy.get('[data-cy="about-heading"]').should('contain', 'About zoom');
  });

  it('There must be 3 paragraphs', function() {
    cy.get('[data-cy="about-paragraph"]').should('have.length', 3);
  });

  it('Hovering over 2012 spent rectangle should display overlay', function() {
    cy.get('[transform="translate(160.5, 0)"] > rect').trigger('mouseover');
  });

  it('Click link should redirect to Aidsfonds website', function() {
    cy.get('[data-cy="about-link-to-web"]').click();
  });
});
