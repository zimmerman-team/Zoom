beforeEach(() => {
  // README keep in mind that Cypress clears the whole state before each test. => signIn() before each test.
  // set this for skipping landing dialog
  cy.setCookie('cookieNotice', 'false');
});

function signIn() {
  cy.visit('/home');
  cy.waitPageLoader();
  cy.waitPageLoader2();
  cy.wait(1000);

  cy.get('body').then($body =>{
    if($body.find('[data-cy="dialog-overlay"]').length){
      cy.get('[data-cy="dialog-overlay"]').click();
    }
  });

  //Check if signed in
  cy.get('[data-cy=sidebar-toggle]').click();
  cy.get('body').then($body => {
    if ($body.find('[data-cy=sidebar-logout-button]').length) {
      cy.get('[data-cy=sidebar-logout-button]').click();
      cy.wait(1000);
    } else {
      cy.get('[data-cy=sidebar-close]').click();
    }
  });
  cy.get('[data-cy=sidebar-toggle]').click();
  cy.get('[data-cy=sidebar-login-email-input]').type(Cypress.env('username'));
  cy.get('[data-cy=sidebar-pass-email-input]').type(Cypress.env('password'));
  cy.get('[data-cy=sidebar-login-button]').click();
  //Instead of wait => wait till request has been done and page has fully loaded
  cy.wait(10000);
}

function navigateToCreateGeo() {
  signIn();
  cy.get('[data-cy="appbar-right-button"]').click();
  cy.get('[data-cy="nav-pane-item-0"]').click();
  cy.get('[data-cy="nav-pane-item-0"]').click();
}

function navigateToCreateLinechart() {
  signIn();
  cy.get('[data-cy="appbar-right-button"]').click();
  cy.get('[data-cy="nav-pane-item-0"]').click();
  cy.get('[data-cy="nav-pane-item-3"]').click();
}

function navigateToTablechart() {
  cy.visit('/visualizer/tablechart/vizID/edit');
}

function navigateToBarchart() {
  cy.visit('/visualizer/barchart/vizID/edit');
}

function navigateToCountryFocusKenya() {
  signIn();
  cy.get('[data-cy="appbar-right-button"]').click();
  cy.get('[data-cy="nav-pane-item-0"]').click();
  cy.get('[data-cy="nav-pane-item-1"]').click();
}

function navigateToCountryFocusNetherlands() {
  signIn();
  cy.get('[data-cy="appbar-right-button"]').click();
  cy.get('[data-cy="nav-pane-item-0"]').click();
  cy.get('[data-cy="nav-pane-item-2"]').click();
}

describe('Create geo functionality', function() {
  it("Shouldn't be able to create geo when not logged in", function() {
    cy.visit('/home');
    cy.wait(1000);
    cy.get('[data-cy="appbar-right-button"]').should('not.have.text', 'Create')
  });

  it('Should display appropriate content per tab', function() {
    signIn();
    cy.wait(2000);
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
  it('Should include /geomap in the url', function() {
    navigateToCreateGeo();
    cy.url().should('include', '/visualizer/geomap');
  });

  it('Should make a snapshot of the visual current state', function() {
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.wait(6000);
    cy.percySnapshot('Chartbuilder - Geomap');
  });

  it('Should pass written text from the /context to /preview', function() {
    // Fixme: Change to proper url or simultate click of the button.
    cy.waitPageLoader();
    cy.get('[href="/visualizer/geomap/vizID/context"]').click();
    cy.waitPageLoader();
    cy.waitPageLoader2();
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

  // TODO: Implement this test.
  // it('Should "save" the chart to the dashboard', function() {
  //   navigateToCreateGeo();
  //   cy.get('[data-cy="legendLayer-label"]').should(
  //     'contain',
  //     'aids related deaths'
  //   );
  //   cy.get('[data-cy=geomap-close-save-button]').click();
  //   cy.visit('/visualizer/geomap/vizID/duplicate');
  //   cy.get('[data-cy="duplicate-to-dashboard"]').click();
  // });

  //TODO: Implement when functionality has been implemented.
  it('Should be able to download to csv/xml/json ', function() {
    navigateToCreateGeo();
    cy.visit('/visualizer/geomap/vizID/download');
    cy.get('[data-cy="dowload-option-JSON"]').click();
    cy.get('[data-cy="dowload-option-CSV"]').click();
    cy.get('[data-cy="dowload-option-XML"]').click();
  });

  it('Should publish the chart to public zoom library', function() {
    navigateToCreateGeo();
    cy.visit('/visualizer/geomap/vizID/visibility');
    cy.get('[data-cy="publish-chart-to-public"]').click();
    cy.visit('/public/chart-library');
    // Fixme: Should check on the vizID in the url, however on creating a chart, the vizID is not in the URL yet.
  });
});

describe('Chartbuilder line chart fragment e2e', function() {
  it('Should contain /linechart/ in the url', function() {
    navigateToCreateLinechart();
    cy.url().should('include', '/visualizer/linechart');
  });

  it('Should display mapped data on the linechart', function() {
    cy.wait(5000);
    cy.contains('Select indicator').click();
    cy.contains('aids related deaths (unaids)').click();
    //Here we check on the Chart Legend
    // cy.get('[data-cy="aids related deaths (unaids)"]');
  });
});

it('Should make a snapshot of the visual current state', function() {
  cy.waitPageLoader();
  cy.waitPageLoader2();
  cy.wait(6000);
  cy.percySnapshot('Chartbuilder - Linechart');
});

//So yeah now that i think of it a fixture is defo needed
describe('Chartbuilder table chart fragment e2e', function() {
  it('Should contain /tablechart in the url and map aids related deaths data', function() {
    signIn();
    navigateToTablechart();
    cy.waitPageLoader2();
    cy.waitPageLoader();
    cy.url().should('include', '/visualizer/tablechart');

    cy.get('[data-cy="year-2005"]').click();
    cy.contains('Select indicator').click();
    cy.contains('aids related deaths (unaids)').click();
    cy.waitPageLoader();
    cy.get('#MUIDataTableBodyRow-2 > :nth-child(5)').should("contain", "2005");
    cy.get('#MUIDataTableBodyRow-2 > :nth-child(9)').should("contain", "aids related deaths (unaids)");
  });

  it('Should make a snapshot of the visual current state', function() {
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.wait(6000);
    cy.percySnapshot('Chartbuilder - Tablechart');
  });

  it('Should sort on Geolocation', function() {
    cy.get(":nth-child(2) > .MUIDataTableHeadCell-toolButton > .MUIDataTableHeadCell-data").click();
    cy.waitPageLoader();
    cy.get('tbody>tr').should("contain", "tonga")
  });

  it('Should only display Kenya data when searching "kenya"', function() {
    cy.get('[aria-label="Search"]').click();
    cy.get(".MuiInputBase-root > .MuiInputBase-input").type("kenya");
    cy.waitPageLoader();
    cy.get("tbody>tr").should("contain", "kenya");
  });

  it('Should be able to delete Kenya data from table', function() {
    cy.get("tbody>tr").within(() => {
      cy.get('input[type="checkbox"]').click();
    });
    cy.get('[aria-label="Delete Selected Rows"]').click();
    cy.waitPageLoader();
    cy.get("tbody>tr").should("contain", "Sorry, no matching records found");

    cy.get('[aria-label="Search"]').click();
    cy.get('.MUIDataTableSearch-main').within(() => {
      cy.get('[type="button"]').click();
    });
  });

  it('Resetting all values should leave a empty datatable', function() {
    cy.get('[data-cy="data-explorer-panel-reset"]').click();
    cy.waitPageLoader();
    cy.get("tbody>tr").should("contain", "Sorry, no matching records found");
  });

  it('Should make a snapshot of the visual current state', function() {
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.wait(6000);
    cy.percySnapshot('Chartbuilder - Tablechart empty state');
  });
});

describe('Chartbuilder bar chart fragment e2e', function() {
  it('Should contain /barchart in the url', function() {
    signIn();
    navigateToBarchart();
    cy.url().should('include', '/visualizer/barchart');
  });

  it('Should make a snapshot of the visual current state', function() {
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.wait(6000);
    cy.percySnapshot('Chartbuilder - Barchart');
  });
});

describe('Chartbuilder country focus Kenya fragment e2e', function() {
  it('Should contain /focusKE in the url', function() {
    navigateToCountryFocusKenya();
    cy.url().should('include', '/visualizer/focusKE');
  });

  it('Should make a snapshot of the visual current state', function() {
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.wait(6000);
    cy.percySnapshot('Chartbuilder - Kenya focus');
  });
});

describe('Chartbuilder country focus Netherlands fragment e2e', function() {
  it('Should contain /focusNL in the url', function() {
    navigateToCountryFocusNetherlands();
    cy.url().should('include', '/visualizer/focusNL');
  });

  it('Should make a snapshot of the visual current state', function() {
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.wait(6000);
    cy.percySnapshot('Chartbuilder - Netherlands focus');
  });
});

