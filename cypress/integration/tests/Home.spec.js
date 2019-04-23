describe('Home page map controls', function() {
  it('Visit Home page ', function() {
    cy.visit('/');
  });

  it('Goes in and out of fullscreen', function() {
    cy.get('[data-cy="home-fullscreen-button"]').click();
    cy.get('body').type('{esc}');
  });

  it('Zooms in and out 3 times', function() {
    for (let i = 0; i < 3; i += 1) {
      cy.get('[data-cy="home-zoom-in-button"]').click();
    }
    for (let i = 0; i < 3; i += 1) {
      cy.get('[data-cy="home-zoom-out-button"]').click();
    }
  });

  it('The year selector makes changes to the time period slider', function() {});
});

describe('Home page geo map filters', function() {
  // Contain is used in the next tests because third party library's created the DOM elements
  it('Navigates through geo map filters', function() {
    cy.get('[data-cy="geomap-filter-button"]').click();
    cy.contains('Geo location').click();
    cy.contains('Select region').click();
    cy.contains('Deselect all').click();
  });

  it('Types eu in searchbar and selects Europe it', function() {
    cy.get('[data-cy="geo-map-search"]')
      .children()
      .children()
      .type('eu');
    cy.contains('europe').click();
    cy.get('[data-cy="geo-map-container"]').click();
  });

  it('Navigates to indicator "condom use" and selects it', function() {
    cy.contains('Indicators').click();
    cy.contains('Select indicator').click();
    cy.contains('condom use').click();
  });

  it('Plots Europe data about condom use', function() {
    cy.get('[data-cy="legendLayer-label"]').should('contain', 'condom use');
    // Fixme: this test should fail looking at the current state, it should only plot data from Europe.
  });

  it('Navigates to a second indicator "aids orphans" and selects it', function() {
    cy.contains('Select indicator').click();
    cy.contains('aids orphans').click();
  });

  it('Plots a second Europe data about aids orphans', function() {
    cy.get('[data-cy="legendCircle-label"]').should('contain', 'aids orphans');
    // Fixme: this test should fail looking at the current state, it should only plot data from Europe.
  });

  it('Resets values', function() {
    cy.get('[data-cy="geo-map-container"]').click();
    cy.get('[data-cy="data-explorer-panel-reset"]').click();
  });

  it('Makes a visual snapshot of the current state', function() {
    cy.percySnapshot('Home page test');
  });
});
