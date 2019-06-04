context('Sign in', () => {
  beforeEach(() => {
    // README keep in mind that Cypress clears the whole state before each test. => signIn() before each test.
    // set this for skipping landing dialog
    cy.setCookie('cookieNotice', 'false');
  });

  it('Visit Homepage', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.get('[data-cy="dialog-overlay"]').click();
  });

  it('Check if signed in', () => {
    cy.get('[data-cy=sidebar-toggle]').click();
    cy.wait(1000);

    cy.get('body').then($body => {
      if ($body.find('[data-cy=sidebar-logout-button]').length) {
        cy.get('[data-cy=sidebar-logout-button]').click();
      } else {
        cy.get('[data-cy=sidebar-close]').click();
      }
    });
  });

  it('Do sign-in procedure', () => {
    cy.get('[data-cy=sidebar-toggle]').click();

    cy.percySnapshot('Sidebar - login');
    cy.get('[data-cy=sidebar-login-email-input]').type(Cypress.env('username'));
    cy.get('[data-cy=sidebar-pass-email-input]').type(Cypress.env('password'));
    cy.get('[data-cy=sidebar-login-button]').click();

    cy.waitForApiRequests();

    cy.location('pathname').should('include', '/dashboard/charts');
    cy.get('[data-cy=sidebar-toggle]').click();

    cy.waitForApiRequests();

    cy.percySnapshot('Sidebar - logout');
    cy.get('[data-cy=sidebar-logout-button]').contains('Sign out');
  });
});
