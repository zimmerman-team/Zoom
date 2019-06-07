beforeEach(() => {
  // README keep in mind that Cypress clears the whole state before each test. => signIn() before each test.
  // set this for skipping landing dialog
  cy.setCookie('cookieNotice', 'false');
});

describe('Chartbuilder geomap chart fragment e2e', function() {
  it('Should map aids related deaths data on the geo map', function() {
    cy.log('**IT NAVIGATES AND ASSERTS ON URL**');
    cy.signIn();
    cy.navigateToCreateGeo();
    cy.url().should('include', '/visualizer/geomap');

    cy.log('**PLOTS SOME DATA**');
    //Here we wait till the indicators are loaded.
    cy.wait(2000);
    cy.get(
      '[class*=ExpansionPanelContainer]:nth-child(4) [data-cy="zoom-select"]'
    )
      .first()
      .click();
    cy.contains('aids related deaths (unaids)').click();
    //Here we wait till the data has been mapped
    cy.waitPageLoader();
    cy.wait(8000);
    cy.get('[data-cy="legendLayer-label"]').should(
      'contain',
      'aids related deaths (unaids)'
    );
  });

  it('Should make a snapshot of the visual current state', function() {
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.wait(5000);
    cy.percySnapshot('Chartbuilder - Geomap');
  });

  it('Should pass written text from the /context to /preview', function() {
    // Fixme: Change to proper url or simultate click of the button.
    cy.log('**DO SOME CONTEXT TESTING**');
    cy.waitPageLoader();
    cy.get('[href="/visualizer/geomap/vizID/context"]').click();
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.get('textarea')
      .last()
      .type('This is a test');
    cy.get('[href="/visualizer/geomap/vizID/preview"]').click();
    cy.get('[data-cy="context-preview-intro"]').should(
      'have.text',
      'This is a test'
    );

    cy.log('**DO SOME DOWNLOAD TESTING*');
    cy.visit('/visualizer/geomap/vizID/download');
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.get('[data-cy="dowload-option-JSON"]').click();
    cy.get('[data-cy="dowload-option-CSV"]').click();
    cy.get('[data-cy="dowload-option-XML"]').click();

    cy.log('**DO SOME PUBLISHING TESTING*');
    cy.visit('/visualizer/geomap/vizID/visibility');
    cy.get('[data-cy="publish-chart-to-public"]').click();
    cy.visit('/public/chart-library');
  });
});
