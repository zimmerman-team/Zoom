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
function navigateToCreateGeo() {
  cy.visit('/home');
  cy.get('[data-cy="dialog-overlay"]').click({force: true});
  cy.get('[data-cy="appbar-right-button"]').click();
  cy.get('[data-cy="nav-pane-item-0"]').click();
  cy.get('[data-cy="nav-pane-item-0"]').click();
}
function navigateToCreateLinechart() {
  cy.visit('/home');
  cy.get('[data-cy="dialog-overlay"]').click({force: true});
  cy.get('[data-cy="appbar-right-button"]').click();
  cy.get('[data-cy="nav-pane-item-0"]').click();
  cy.get('[data-cy="nav-pane-item-3"]').click();
}
function navigateToTablechart() {
  cy.visit('/home');
  cy.get('[data-cy="dialog-overlay"]').click({force: true});
  cy.get('[data-cy="appbar-right-button"]').click();
  cy.get('[data-cy="nav-pane-item-0"]').click();
  cy.get('[data-cy="nav-pane-item-5"]').click();
}

describe('Create geo functionality', function() {
  it("Shouldn't be able to create geo when not logged in", function() {
    cy.visit('/home');
    signOut();
    cy.wait(1000);
    cy.get('[data-cy="dialog-overlay"]').click();
    cy.get('[data-cy="appbar-right-button"]').should('not.have.text', 'Create');
  });

  it('Should display appropriate content per tab', function() {
    signIn();
    cy.get('[data-cy="appbar-right-button"]').click();
    cy.get('[data-cy="nav-pane-item-0"]').should('have.text', 'Create chart');
    cy.get('[data-cy="nav-pane-item-1"]').should('have.text', 'Convert data');
    cy.get('[data-cy="nav-pane-item-2"]').should('have.text', 'Explore data');

    cy.get('[data-cy="nav-pane-item-0"]').click();
    cy.get('[data-cy="nav-pane-item-0"]').should('have.text', 'Geo Map Chart');
    cy.get('[data-cy="nav-pane-item-1"]').should(
      'have.text',
      'Country Focus Page Kenya'
    );
    cy.get('[data-cy="nav-pane-item-2"]').should(
      'have.text',
      'Country Focus Page Netherlands'
    );
    cy.get('[data-cy="nav-pane-item-3"]').should('have.text', 'Line chart');
    cy.get('[data-cy="nav-pane-item-4"]').should('have.text', 'Bar chart');
    cy.get('[data-cy="nav-pane-item-5"]').should('have.text', 'Table chart');
    cy.get('[data-cy="nav-pane-item-6"]').should('have.text', 'Donut chart');
  });
});

describe('Chartbuilder geomap chart fragment e2e', function() {
  it('Should contain /geomap in the url', function() {
    navigateToCreateGeo();
    cy.url().should('include', '/visualizer/geomap');
  });

  it('Should pass written text from the /context to /preview', function() {
    // Fixme: Change to proper url or simultate click of the button.
    cy.visit('/visualizer/geomap/vizID/context');
    cy.get('textarea')
      .last()
      .type('This is a test');
    cy.get('[href="/visualizer/geomap/vizID/preview"]').click();
    cy.get('[data-cy="context-preview-intro"]').should(
      'have.text',
      'This is a test'
    );
  });

  it('Should map aids related deaths data on the geo map', function() {
    navigateToCreateGeo();
    cy.contains('Select indicator').click();
    cy.contains('aids related deaths (unaids)').click();
    cy.get('[data-cy="legendLayer-label"]').should(
      'contain',
      'aids related deaths (unaids)'
    );
  });

  it('Should "save" the chart to the dashboard', function() {
    navigateToCreateGeo();
    cy.get('[data-cy="legendLayer-label"]').should(
      'contain',
      'aids related deaths'
    );
    cy.get('[data-cy=geomap-close-save-button]').click();
    cy.visit('/visualizer/geomap/vizID/duplicate');
    cy.get('[data-cy="duplicate-to-dashboard"]').click();
    // Fixme: Duplicate to dashboard broken
    cy.get('[data-cy="edit-chart"]').click();
    // Fixme: Should check on the vizID in the url,
    // however on creating a chart, the vizID is not in the URL yet.
  });

  it('Should be able to download to csv/xml/json ', function() {
    navigateToCreateGeo();
    cy.visit('/visualizer/geomap/vizID/download');
    cy.get('[data-cy="dowload-option-JSON"]').click();
    cy.get('[data-cy="dowload-option-CSV"]').click();
    cy.get('[data-cy="dowload-option-XML"]').click();
    // Fixme: Do something (dont know expected behaviour yet
  });

  it('Should publish the chart to public zoom library', function() {
    navigateToCreateGeo();
    cy.visit('/visualizer/geomap/vizID/visibility');
    cy.get('[data-cy="publish-chart-to-public"]').click();
    cy.visit('/public/chart-library');
    // Fixme: Should check on the vizID in the url,
    // however on creating a chart, the vizID is not in the URL yet.
  });
});

describe('Chartbuilder line chart fragment e2e', function() {
  it('Should contain /linechart/ in the url', function() {
    navigateToCreateLinechart();
    cy.url().should('include', '/visualizer/linechart');
  });

  it('Should display mapped data on the linechart', function() {
    navigateToCreateLinechart();
    cy.contains('Select indicator').click({force: true});
    cy.contains('aids related deaths (unaids)').click();
    cy.get('[data-cy="aids related deaths (unaids)"]');
  });

  // Fixme: functionality not yet built
  // it('Should modify the graph structure', function() {
  //   signIn();
  //   navigateToCreateLinechart();
  // });
  //
  // it('Should be saved as a linechart', function() {
  //   signIn();
  //   navigateToCreateLinechart();
  //   cy.get('[data-cy=geomap-close-save-button]').click();
  //   cy.get('[data-cy="duplicate-to-dashboard"]').click();
  //   cy.get('[data-cy="edit-chart"]').click();
  // });
});

describe('Chartbuilder table chart fragment e2e', function() {
  it('Should contain /tablechart in the url', function() {
    navigateToTablechart();
    cy.url().should('include', '/visualizer/tablechart');
  });

  it('Should display aids related deaths in the year 1990', function() {
    cy.contains('Select indicator').click();
    cy.contains('aids related deaths').click();
    // cy.get('#MUIDataTableBodyRow-1 > :nth-child(7)').contains("aids related deaths");
    //todo
  });
});
