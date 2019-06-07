beforeEach(() => {
  // README keep in mind that Cypress clears the whole state before each test. => signIn() before each test.
  // set this for skipping landing dialog
  cy.setCookie('cookieNotice', 'false');
});

describe('Create geo functionality', function() {
  it("Shouldn't be able to create geo when not logged in", function() {
    cy.visit('/home');
    cy.wait(1000);
    cy.get('[data-cy="appbar-right-button"]').should('not.have.text', 'Create');
  });

  it('Should display appropriate content per tab', function() {
    cy.signIn();
    cy.wait(5000);
    cy.get('[data-cy="appbar-right-button"]').click();

    cy.get('[data-cy="nav-pane"]').should('contain', 'Create chart');
    cy.get('[data-cy="nav-pane"]').should('contain', 'Convert data');
    cy.get('[data-cy="nav-pane"]').should('contain', 'Explore data');
    cy.get('[data-cy="nav-pane-item-0"]').click();

    cy.get('[data-cy="nav-pane"]').should('contain', 'Geo Map Chart');
    cy.get('[data-cy="nav-pane"]').should(
      'contain',
      'Country Focus Page Kenya'
    );
    cy.get('[data-cy="nav-pane"]').should(
      'contain',
      'Country Focus Page Netherlands'
    );
    cy.get('[data-cy="nav-pane"]').should('contain', 'Line chart');
    cy.get('[data-cy="nav-pane"]').should('contain', 'Table chart');
  });
});
