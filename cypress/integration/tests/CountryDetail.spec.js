describe('Country detail page', () => {
  let data;
  beforeEach(() => {
    cy.setCookie('cookieNotice', 'false');
    cy.fixture('CountryDetailFixture.json').then(responseData => {
      data = responseData;
    });
  });

  it('Should display the correct content for the Kenya page', () => {
    // Here we navigate to the country detail page
    cy.signIn();
    cy.visit('/country/ke');
    // cy.get('[data-cy="sidebar-toggle"]').click();
    // cy.get('[data-cy="sidebar-Country Detail"]').click();

    // Here we take a Percy snapshot
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.percySnapshot('Country detail');

    // Here we check if the topbar navigation displays the right content
    data.TopBarNavigation.map(label => {
      cy.get('[data-cy=navbar-country-detail]').should('contain', label);
    });

    // Here we check if clicking on the navigation items brings us to the right view fixme
    for (let i = 0; i < data.Headers.length - 1; i++) {
      cy.get(`[data-cy="navbar-item-${data.TopBarNavigation[i]}"]`).click();
      cy.queryByText(data.Headers[i]).should('be.visible');
    }

    // The last header contains dynamic data, so we make a different assertion
    cy.get(
      `[data-cy="navbar-item-${
        data.TopBarNavigation[data.TopBarNavigation.length - 1]
      }"]`
    ).click();
    cy.get(`[data-cy="project-fragment"]`).should(
      'contain',
      data.Headers[data.Headers.length - 1]
    );

    // Here we check if the first list item contains the correct data
    for (let i = 0; i < data.ListItem.values.length; i++) {
      cy.get('[data-cy=project-list]').should(
        'contain',
        data.ListItem.labels[i]
      );
      cy.get('[data-cy=project-list]').should(
        'contain',
        data.ListItem.values[i]
      );
    }

    // Here we check if clicking on a listitems header navigates to the right iati-activity page
    cy.get(`[data-cy="project-2769571"]`).click();
    cy.url().should('include', 'iati-activity/2769571');
    cy.get(`[data-cy="header"]`).should('contain', data.ListItem.header);
  });
});
