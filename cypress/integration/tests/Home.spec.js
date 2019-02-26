describe('Home page E2E test', function() {
  it('Visit Home page ', function() {
    cy.visit('/');
  });

  it('Goes into fullscreen ', function() {
    cy.get('[data-cy="home-fullscreen-button"]').click();
  });

  it('Goes out of fullscreen ', function() {
    cy.get('body').type('{esc}');
  });

  it('Zooms in 3 times ', function() {
    for (let i = 0; i < 3; i += 1) {
      cy.get('[data-cy="home-zoom-in-button"]').click();
    }
  });

  it('Zooms out 3 times ', function() {
    for (let i = 0; i < 3; i += 1) {
      cy.get('[data-cy="home-zoom-out-button"]').click();
    }
  });

  it('Opens sidebar ', function() {
    cy.get('[data-cy="geomap-filter-button"]').click();
  });

  // Contain is used in the next tests because third party library's created the elements
  it('Opens geo location ', function() {
    cy.contains('Geo location').click();
  });

  it('Opens select region', function() {
    cy.contains('Select region').click();
  });

  it('Types eu in searchbar ', function() {
    cy.get('[data-cy="geo-map-search"]')
      .children()
      .children()
      .type('eu');
  });

  it('Selects Europe from the dropdown ', function() {
    cy.contains('europe').click();
  });

  it('Resets values ', function() {
    cy.get('[data-cy="data-explorer-panel-reset"]').click();
  });

  it('Clicks on the map ', function() {
    cy.get('[data-cy="geo-map-container"]').click();
  });
});
