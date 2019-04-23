describe('Visiting all pages through navigation from home', () => {
  beforeEach(function() {
    cy.visit('/');
    cy.get('[data-cy=sidebar-toggle]').click();
  });

  it('Goes into Country detailpage through navigation bar', () => {
    cy.get('[data-cy=sidebar-country]').click();
    cy.url().should('include', '/country');
    cy.get('h2').should('contain', 'Zoom in on');
  });

  it('Goes into IATI detailpage through navigation bar', () => {
    cy.get('[data-cy=sidebar-iati]').click();
    cy.url().should('include', '/iati');
  });

  it('Goes into Datamapper through navigation bar', () => {
    cy.get('[data-cy=sidebar-datamapper]').click();
    cy.url().should('include', '/mapper');
    cy.get('h2').should('contain', 'Describe meta data');
  });

  it('Goes into About ZOOM through navigation bar', () => {
    cy.get('[data-cy=sidebar-about]').click();
    cy.url().should('include', '/about');
    cy.get('h2').should('contain', 'About zoom');
  });

  it('Makes a visual snapshot of the current state', () => {
    cy.percySnapshot('About page test');
  });
});

describe('Visiting all pages using url ', () => {
  it('Visits all urls as none signed in user', () => {
    cy.visit('/');
    cy.visit('/home');
    cy.visit('/callback');
    cy.visit('/country');
    // todo: test all detail pages
    // cy.visit('/country/:iso2');
    cy.visit('/iati');
    cy.visit('/iati-activity');
    // cy.visit('/iati-activity/:activity_id');
    cy.visit('/add-user');
    cy.visit('/create-team');
    cy.visit('/dashboard');
    // cy.visit('/dashboard/:tab');
    cy.visit('/about');
    cy.visit('/mapper');
    cy.visit('/component');
    cy.visit('/banana');
  });

});
