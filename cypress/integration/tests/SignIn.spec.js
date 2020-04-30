context('Sign in', () => {
  beforeEach(() => {
    cy.setCookie('cookieNotice', 'false');
    cy.setCookie('homeDialogShown', 'true');
  });

  it('Visit Homepage', () => {
    cy.visit('/');
  });

  it('Do sign-in procedure', () => {
    cy.get('[data-cy=sidebar-toggle]').click();
    cy.percySnapshot('Sidebar - login');
    cy.get('[data-cy=sidebar-login-email-input]').type(Cypress.env('username'));
    cy.get('[data-cy=sidebar-pass-email-input]').type(Cypress.env('password'));
    cy.get('[data-cy=sidebar-login-button]').click();
    cy.wait(4000);
    cy.location('pathname').should('include', '/dashboard/charts');
    cy.get('[data-cy=sidebar-toggle]').click();
    cy.get('[data-cy=sidebar-logout-button]').contains('Sign out');
  });
});
