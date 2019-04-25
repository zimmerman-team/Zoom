context('Sign in', () => {
  it('Visit Homepage', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.get('[data-cy="dialog-overlay"]').click({force: true});
  });
  it('Check if signed in', () => {
    cy.get('[data-cy=sidebar-toggle]').click();
    cy.get('body').then($body => {
      if ($body.find('[data-cy=sidebar-logout-button]').length) {
        cy.get('[data-cy=sidebar-logout-button]').click();
        cy.wait(1000);
      } else {
        cy.get('[data-cy=sidebar-close]').click();
      }
    });
  });
  it('Do sign-in procedure', () => {
    cy.get('[data-cy=sidebar-toggle]').click();
    cy.wait(1000);
    cy.get('[data-cy=sidebar-login-email-input]').type(Cypress.env('username'));
    cy.get('[data-cy=sidebar-pass-email-input]').type(Cypress.env('password'));
    cy.get('[data-cy=sidebar-login-button]').click();
    cy.wait(4000);
    cy.location('pathname').should('include', '/dashboard/charts');
    cy.get('[data-cy=sidebar-toggle]').click();
    cy.get('[data-cy=sidebar-logout-button]').contains('Sign out');
  });
});
