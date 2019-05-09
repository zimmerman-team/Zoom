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

  cy.wait(7000);
}

describe('Visiting all pages through navigation from home as not logged in', () => {
  beforeEach(function() {
    cy.visit('/');
    cy.get('[data-cy=dialog-overlay]').click();
    cy.get('[data-cy=sidebar-toggle]').click();
  });

  it('Goes into Public charts through navigation bar', () => {
    cy.get('[data-cy="sidebar-Public Charts"]').click();
    cy.url().should('include', '/public/chart-library');
    cy.get('h4').should('contain', 'Zoom chart library');
  });

  it('Goes into About ZOOM through navigation bar', () => {
    cy.get('[data-cy="sidebar-About ZOOM"]').click();
    cy.url().should('include', '/about');
    cy.get('h2').should('contain', 'About zoom');
  });
});

describe('Visiting all pages through navigation from home as logged in', () => {
  beforeEach(function() {
    cy.signIn();
    cy.visit('/');
    cy.get('[data-cy=dialog-overlay]').click();
    cy.get('[data-cy=sidebar-toggle]').click();
  });

  it('Goes into Dashboard through navigation bar', () => {
    cy.get('[data-cy="sidebar-Dashboard"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('Goes into Public charts through navigation bar', () => {
    cy.get('[data-cy="sidebar-Public Charts"]').click();
    cy.url().should('include', '/public/chart-library');
    cy.get('h4').should('contain', 'Zoom chart library');
  });

  it('Goes into About ZOOM through navigation bar', () => {
    cy.get('[data-cy="sidebar-About ZOOM"]').click();
    cy.url().should('include', '/about');
    cy.get('h2').should('contain', 'About zoom');
  });
});
