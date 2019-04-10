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
  it('Should pass self written text from the /context to /preview', function() {
    signIn();
    cy.get('[data-cy="appbar-right-button"]').click();
    cy.get('[data-cy="nav-pane-item-0"]').click();
    //Fixme: Change to proper url.
    cy.visit('/visualizer/geomap/vizID/context');
    cy.get('textarea')
      .last()
      .type('This is a test');
    cy.get('[href="/visualizer/geomap/vizID/preview"]').click();
    // cy.get('[data-cy="context-preview-body"]').should(
    //   'have.text',
    //   'This is a test'
    // );
  });

  //it('Should display mapped data', function() {});

  // it('Should "save" the chart to the dashboard', function() {});
  //
  // it('Should "save" the chart as a JSON, CSV or XML file ', function() {});
  //
  // it('Should duplicate chart to dashboard', function() {});
  //
  // it('Should publish the chart to public zoom library', function() {});
  //
  // it('Should publish the chart to the team', function() {});
});
