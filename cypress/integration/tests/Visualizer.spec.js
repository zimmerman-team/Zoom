function signOut() {
  cy.clearCookies();
  cy.clearLocalStorage();
}
function signIn() {
  cy.visit('/');
  cy.wait(1000);
  cy.get('[data-cy="dialog-overlay"]').click();
  signOut();
  cy.get('[data-cy=sidebar-toggle]').click();
  cy.get('[data-cy=sidebar-login-email-input]').type(Cypress.env('username'));
  cy.get('[data-cy=sidebar-pass-email-input]').type(Cypress.env('password'));
  cy.get('[data-cy=sidebar-login-button]').click();
  cy.get('[data-cy="dialog-overlay"]').click();
}
function navigateToCreateGeo() {
  cy.get('[data-cy="appbar-right-button"]').click();
  cy.get('[data-cy="nav-pane-item-0"]').click();
  cy.get('[data-cy="nav-pane-item-0"]').click();
}
describe('Create geo functionality', function() {
  it("Shouldn't be able to create geo when not logged in", function() {
    cy.visit('/');
    signOut();
    cy.wait(1000);
    cy.get('[data-cy="dialog-overlay"]').click();
    cy.get('[data-cy="appbar-right-button"]').should('not.have.text', 'Create');
  });

  it('Should display appropriate content per tab', function() {
    signIn();
    cy.get('[data-cy="appbar-right-button"]').click();
    cy.get('[data-cy="nav-pane-item-0"]').should('have.text', 'Create chart');
    cy.get('[data-cy="nav-pane-item-1"]').should('have.text', 'Convert data');
    cy.get('[data-cy="nav-pane-item-2"]').should('have.text', 'Explore data');

    cy.get('[data-cy="nav-pane-item-0"]').click();
    cy.get('[data-cy="nav-pane-item-0"]').should('have.text', 'Geo Map Chart');
    cy.get('[data-cy="nav-pane-item-1"]').should(
      'have.text',
      'Country Focus Page Kenya'
    );
    cy.get('[data-cy="nav-pane-item-2"]').should(
      'have.text',
      'Country Focus Page Netherlands'
    );
    cy.get('[data-cy="nav-pane-item-3"]').should('have.text', 'Line chart');
  });
});

describe('Chartbuilder geomap chart fragment e2e', function() {
  it('Should pass written text from the /context to /preview', function() {
    signIn();
    navigateToCreateGeo();
    // Fixme: Change to proper url or simultate click of the button.
    cy.visit('/visualizer/geomap/vizID/context');
    cy.get('textarea')
      .last()
      .type('This is a test');
    cy.get('[href="/visualizer/geomap/vizID/preview"]').click();
    cy.get('[data-cy="context-preview-intro"]').should(
      'have.text',
      'This is a test'
    );
  });

  it('Should map aids related deaths data on the geo map', function() {
    signIn();
    navigateToCreateGeo();
    cy.contains('Select indicator').click();
    cy.contains('aids related deaths (unaids)').click();
    cy.get('[data-cy="legendLayer-label"]').should(
      'contain',
      'aids related deaths (unaids)'
    );
  });

  it('Should "save" the chart to the dashboard', function() {
    signIn();
    navigateToCreateGeo();
    cy.get('[data-cy="legendLayer-label"]').should(
      'contain',
      'aids related deaths'
    );
    cy.get('[data-cy=geomap-close-save-button]').click();
    // Fixme: Should check on the vizID in the url,
    // however on creating a chart, the vizID is not in the URL yet.
  });

  it('Should be able to download to csv/xml/json ', function() {
    signIn();
    navigateToCreateGeo();
    cy.visit('/visualizer/geomap/vizID/download');
    cy.get('[data-cy="dowload-option-JSON"]').click();
    cy.get('[data-cy="dowload-option-CSV"]').click();
    cy.get('[data-cy="dowload-option-XML"]').click();
    // Fixme: Do something (dont know expected behaviour yet
  });

  it('Should publish the chart to public zoom library', function() {
    signIn();
    navigateToCreateGeo();
    cy.visit('/visualizer/geomap/vizID/visibility');
    cy.get('[data-cy="publish-chart-to-public"]').click();
    cy.visit('/public/chart-library');
    // Fixme: Should check on the vizID in the url,
    // however on creating a chart, the vizID is not in the URL yet.
  });
});
