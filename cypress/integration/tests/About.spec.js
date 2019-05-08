describe('About page E2E test', function() {
  it('Visit about page', function() {
    cy.visit('/About');
  });

  it('Should make a snapshot of the visual current state', function() {
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.wait(5000);
    cy.percySnapshot('About page');
  });

  it('Title should contain About zoom', function() {
    cy.get('[data-cy="about-heading"]').should('contain', 'About zoom');
  });

  it('There must be 3 paragraphs', function() {
    cy.get('[data-cy="about-paragraph"]').should('have.length', 3);
  });

  // So we want to make this assertion of the element actually being there.
  // The tests are being run in a 1680 x 954 (49%) window.
  // it('Hovering over 2012 spent rectangle should display overlay', function() {
  //   cy.get('[transform="translate(107, 207)"] > rect').trigger('mouseover');
  // });

  it('Click link should redirect to Aidsfonds website', function() {
    cy.get('[data-cy="about-link-to-web"]').click();
  });
});
