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

  it('Should navigate to create/geo when clicking on the create geo button', function() {
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
  it('Should pass text from the /context to /preview', function() {});
});
