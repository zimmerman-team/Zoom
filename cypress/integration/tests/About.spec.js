describe("About page E2E test", function() {
  it('Visit about page', function() {
    cy.visit('/About');
  });

  it('Click link', function() {
    cy.get('[data-cy="about-link-to-web"]').click();
  });

  it('Click test', function() {
    cy.get('[transform="translate(160.5, 0)"] > rect').trigger('mouseover');
  });
});


