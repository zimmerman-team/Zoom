describe('Visiting all pages through navigation from home as not logged in', () => {
  beforeEach(() => {
    cy.visit('/home');
    cy.get('[data-cy=dialog-overlay]').click();
    cy.get('[data-cy=cookie-notice]').click();
    cy.get('[data-cy=sidebar-toggle]').click();
    cy.waitForApiRequests();
    cy.waitPageLoader();
    cy.waitPageLoader2();
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
  beforeEach(() => {
    cy.signIn();
    cy.get('[data-cy=cookie-notice]').click();
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
