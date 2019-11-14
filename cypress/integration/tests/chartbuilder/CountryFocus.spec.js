beforeEach(() => {
  // README keep in mind that Cypress clears the whole state before each test. => signIn() before each test.
  // set this for skipping landing dialog
  cy.setCookie('cookieNotice', 'false');
});

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
    cy.get('[data-cy="indicator-1"]').click();
    cy.wait(10000);
    cy.get('[data-cy="geo-map-search"] input').type(
      'number of new hiv infections'
    );
    cy.contains('number of new hiv infections').click();
    cy.wait(1000);
    cy.get('[class*=ZoomSelectstyles__DropDownContainer] > li').click({
      force: true
    });
    cy.wait(1000);
    cy.get('[class*=ZoomSelectstyles__DropDownContainer] > li').click({
      force: true
    });
    cy.wait(20000);
    cy.get('[data-cy="legendLayer-label"]').should(
      'contain',
      'number of new hiv infections'
    );
  });

  it('Should be able to plot NL specific data', function() {
    cy.log('**Navigates to Country Focus NL**');
    cy.visit('/visualizer/focusNL/vizID/edit');
    cy.url().should('include', '/visualizer/focusNL');

    cy.log('**It makes a Percy snapshot**');
    cy.waitPageLoader2();
    cy.waitPageLoader();
    cy.percySnapshot('Chartbuilder - Netherlands focus');

    cy.log('**Plots some NL specific data**');

    cy.wait(15000);
    cy.get('[data-cy="indicator-1"]').click();
    cy.wait(10000);
    cy.get('[data-cy="geo-map-search"] input').type(
      'number of new hiv infections'
    );
    cy.contains('number of new hiv infections').click({ force: true });
    cy.wait(3000);
    cy.get('[class*=ZoomSelectstyles__DropDownContainer] > li').click({
      force: true
    });
    cy.wait(1000);
    cy.get('[class*=ZoomSelectstyles__DropDownContainer] > li').click({
      force: true
    });
    cy.wait(20000);
    cy.get('[data-cy="legendLayer-label"]').should(
      'contain',
      'number of new hiv infections'
    );
  });
});
