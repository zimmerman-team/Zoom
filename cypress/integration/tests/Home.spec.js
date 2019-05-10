describe('Home page navigation', function() {
  it('Should visit home page', function() {
    cy.visit('/home');
    cy.waitPageLoader();
    cy.waitPageLoader2();
  });

  it('Should make a snapshot of the visual current state', function() {
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.percySnapshot('Home page - Dialog + Cookie notice');
  });

  it('Should be able to click away the dialog overlay', function() {
    cy.get('[data-cy=dialog-overlay]').click();
    cy.get('[data-cy=dialog-overlay]').should('not.be.visible');
  });

  it('Should make a snapshot of the visual current state', function() {
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.wait(3000);
    cy.percySnapshot('Home page - Cookie notice');
  });

  it('Should be able to click away the cookie notice', function() {
    cy.get('[data-cy="cookie-notice"]').click();
    cy.get('[data-cy="cookie-notice"]').should('not.be.visible');
  });

  it('Should make a snapshot of the visual current state', function() {
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.percySnapshot('Home page');
  });
});

describe('Home page map controls', function() {
  // it('Goes in and out of fullscreen', function() {
  //   cy.get('[data-cy="home-fullscreen-button"]').click();
  //   cy.wait(2000);
  //   cy.get('body').type('{esc}');
  //
  // });

  it('Zooms in and out 3 times', function() {
    for (let i = 0; i < 3; i += 1) {
      cy.get('[data-cy="home-zoom-in-button"]').click();
    }
    for (let i = 0; i < 3; i += 1) {
      cy.get('[data-cy="home-zoom-out-button"]').click();
    }
  });

  //TODO: Is a functionality but not implemented right now.
  it('The year selector makes changes to the time period slider', function() {});
});

describe('Home page geo map datamapping', function() {
  it('Plots South America data about aids related deaths', function() {
    cy.visit('/');
    cy.get('[data-cy=dialog-overlay]').click();
    cy.get('[data-cy="cookie-notice"]').click();
    cy.get('[data-cy="geomap-filter-button"]').click();
    cy.get('[data-cy="data-explorer-panel-reset"]').click();
    cy.contains('Select region').click();
    cy.contains('south america').click();
    cy.get('[data-cy="geo-map-container"]').click();
    cy.contains('Select indicator').click();
    cy.contains('aids related deaths').click();
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.get('[data-cy="legendLayer-label"]').should('contain', 'aids related deaths');
    cy.contains('south america');
  });

  it('Should make a snapshot of the visual current state', function() {
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.percySnapshot('Home page - Aids related deaths in South America');
  });
});
