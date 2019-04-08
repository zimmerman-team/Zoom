describe('Create geo functionality', function() {
  function signIn() {
    cy.visit('/');
    cy.wait(1000);
    cy.get('[data-cy="dialog-overlay"]').click();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.get('[data-cy=sidebar-toggle]').click();
    cy.get('[data-cy=sidebar-login-email-input]').type(Cypress.env('username'));
    cy.get('[data-cy=sidebar-pass-email-input]').type(Cypress.env('password'));
    cy.get('[data-cy=sidebar-login-button]').click();
    cy.get('[data-cy="dialog-overlay"]').click();
  }

  it("Shouldn't be able to create geo when not logged in", function() {
    cy.visit('/');
    cy.wait(1000);
    cy.get('[data-cy="dialog-overlay"]').click();
    cy.get('[data-cy="appbar-right-button"]').should('not.have.text', 'Create');
    cy.visit('/create/geo');
    cy.url().should('not.include', '/create/geo');
  });

  it('Should navigate to "enter url here" when clicking on the create geo button', function() {
    signIn();
    cy.get('[data-cy="geomap-filter-button"]').click();
    cy.get('[data-cy="nav-pane-item"]')
      .first()
      .click();
    cy.get('[data-cy="nav-pane-item"]')
      .first()
      .click();
    cy.url().should('include', '/create/geo');
  });
  // todo: Implement when routing from create/geo is more clear
  it('Should display appropriate content per tab', function() {});

  it('Should pass self written text from the /context to /preview', function() {});

  it('Should display mapped data', function() {});

  it('Should "save" the chart to the dashboard', function() {});

  it('Should "save" the chart as a JSON, CSV or XML file ', function() {});

  it('Should duplicate chart to dashboard', function() {});

  it('Should publish the chart to public zoom library', function() {});

  it('Should publish the chart to the team', function() {});
});
